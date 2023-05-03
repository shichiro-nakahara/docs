# Notes and Nullifiers

## Pedersen background

A note on pedersen hashing.

- `pedersen::commit` returns a point.
- `pedersen::compress` returns the x-coordinate of `pedersen::commit`.

A different generator is used for each type of note and nullifier (including different generators for partial vs complete commitments). See the hackmd https://hackmd.io/gRsmqUGkSDOCI9O22qWXBA?view for a detailed description of pedersen hashing using turbo plonk.

Note: `pedersen::compress` is collision resistant (see the large comment above the `hash_single` function in the codebase, see the hackmd https://hackmd.io/urZOnB1gQimMqsMdf7ZBvw for a formal proof), so this can be used in place of `pedersen::commit` for note commitments & nullifiers.

## Notes and Commitments

### Account note

An **Account Note** associates a spending key with an account. It consists of the following field elements. See the dedicated [account_circuit.md](./account_circuit.md) for more details.

- `alias_hash`: the 224 bit `alias_hash`
- `account_public_key.x`: the x-coordinate of the account public key
- `spending_public_key.x`: the x-coordinate of the spending key that is been assigned to this account via this note.

An account note commitment is:

- `pedersen::compress(alias_hash, account_public_key.x, signing_pub_key.x)`
  - Pedersen GeneratorIndex: `ACCOUNT_NOTE_COMMITMENT`

### Value note

Consists of the following:

- `secret`: a random value to hide the contents of the
  commitment.
- `owner.x` and `owner.y`: the public key of the owner of the value note. This is a Grumpkin point.
- `account_required`: Is the note linked to an existing account or can the note be spent without an account, by directly signing with the owner key
- `creator_pubkey`: Optional. Allows the sender of a value note to inform the recipient who the note came from.
- `value`: the value contained in this note.
- `asset_id`: unique identifier for the 'currency' of this note. The RollupProcessor.sol maps asset_id's with either ETH or the address of some ERC-20 contract.
- `input_nullifier`: In order to create a value note, another value note must be nullified (except when depositing, where a 'gibberish' nullifier is generated). We include the `input_nullifier` here to ensure the commitment is unique (which, in turn, will ensure this note's nullifier will be unique).

**partial commitment**

- `pedersen::compress(secret, owner.x, owner.y, account_required, creator_pubkey)`
  - Pedersen GeneratorIndex: `VALUE_NOTE_PARTIAL_COMMITMENT`
  - `creator_pubkey` can be zero.

> _Note:_ The `secret` is to construct a hiding Pedersen commitment to hide the note details.

**complete commitment**

- `pedersen::compress(value_note_partial_commitment, value, asset_id, input_nullifier)`
  - Pedersen GeneratorIndex: `VALUE_NOTE_COMMITMENT`
  - `value` and `asset_id` can be zero

In other words:

$$
\begin{align}
&Comm(\text{ValueNote}) = \big( [(\text{note.secret} \cdot g_0 + \text{note.owner.x} \cdot g_1 + \text{note.owner.y} \cdot g_2 + \text{note.account-required} \cdot g_3 \\
&+ \text{note.creator-pubkey} \cdot g_4).x] \cdot h_0 + \text{note.value} \cdot h_1 + \text{note.asset-id} \cdot h_2 + \text{note.input-nullifier} \cdot h_3 \big) .x
\end{align}
$$

(The generator indexing is just for illustration. Consult the code.)

# Note encryption and decryption

Details on this are found [here](https://hackmd.io/@aztec-network/BJKHah_4d)

# Nullifiers

## Value note nullifier

**Objectives** of this nullifier:

- Only the owner of a note may be able to produce the note's nullifier.
- No collisions. Each nullifier can only be produced for one value note commitment. Duplicate nullifiers must not be derivable from different note commitments.
- No collisions between nullifiers of other notes (i.e. claim notes or defi interaction notes).
- No double-spending. Each commitment must have one, and only one, nullifier.
- The nullifier must only be accepted and added to the nullifier tree if it is the output of a join-split circuit which 'spends' the corresponding note.

**Calculation**
We set out the computation steps below, with suggestions for changes:

- `hashed_pk = account_private_key * G` (where `G` is a generator unique to this operation).
  - This `hashed_pk` is useful to demonstrate to a 3rd party that you've nullified something without having to provide your secret key.
- `compressed_inputs = pedersen::compress(value_note_commitment, hashed_pk.x, hashed_pk.y, is_real_note)`
  - This compression step reduces the cost (constrain-wise) of the blake2s hash which is done next.
- `nullifier = blake2s(compressed_inputs);`
  - blake2s is needed, because a pedersen commitment alone can leak data (see comment in the code for more details on this).

Pedersen GeneratorIndex:

- `JOIN_SPLIT_NULLIFIER_ACCOUNT_PRIVATE_KEY` for the hashed_pk
- `JOIN_SPLIT_NULLIFIER` to compress the inputs