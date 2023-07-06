# Rollup Contract

Rollup contract is responsible for processing Nata Network zkRollups, relaying them to a verifier contract for validation and performing all relevant token transfers.

## High-Level Overview of Layer 2 Architecture

The specifics of the Layer 2 architecture are not explicitly in scope for the smart contract audit, as the rules/transaction semantics are defined via the logic in our ZK-SNARK cryptographic circuits, not the L1 smart contracts.

However, understanding the architecture may be useful to better understand the logic of the rollup processor smart contract, and the logic it executes when processing a rollup block.

### State Model

L2 state is recorded in 5 append-only databases, represented as Merkle trees. The Rollup contract records the roots of each tree via the rollupStateHash variable.

A call to the _processRollup(...)_ method is, at its core, a request to update the roots of the above Merkle trees due to changes in the underlying databases from a block of L2 transactions.

The main databases/Merkle trees are:

- **dataTree** contains UTXO notes that contain all created _value notes_ and _account notes_
- **rootTree** contains all past (and the present) Merkle roots of the dataTree.
Used in L2 transactions to prove the existence of notes in the dataTree.

The _dataTree_ has with it associated a shared nullifier set.
A nullifier set is an additional database which is also represented as a Merkle tree whose roots are included in _rollupStateHash_.
This nullifier set can be shared because there is no risk of collisions.

Nullifier sets record all items that have been deleted from their linked database.
The encryption algorithm used to encrypt nullifiers is different from the encryption used for their counterpart objects in their linked database.
This gives us the property of unlinkability - observers cannot link note creation to note destruction, which obscures the transaction graph.

The _rootTree_ has no linked nullifier set as it is not possible to delete members of _rootTree_.

## L2 data structures

The following is a brief description of the data structures in the Nata Network L2 architecture.
See [Notes and Nullifiers](./notes_and_nullifiers.md) for a more complete descriptions.

**Value notes** are stored in the _dataTree_.
They represent a discrete sum of MATIC, ERC20 tokens or virtual assets held by a user.

**Account notes** are stored in the _dataTree_.
They link a human-readable alias to both an account public key and to a spending public key.
A user can have multiple account notes with multiple spending keys, but all must share the same alias and account key.
> Note: Account keys are used to decrypt/view notes, spending keys are required to spend notes.
The security requirements for the former are weaker than the latter, as spending keys are required to move user funds.

## L2 high-level circuit architecture

Nata Network utilizes the following ZK-SNARK circuits to describe and validate L2 transactions:

### Single transaction circuits

**Join-Split circuit**
Describes a single _deposit/withdraw/spend_ transaction.
Proof is created by the user on their local hardware.

**Account circuit**
Describes a single _account_ transaction.
Proof is created by the user on their local hardware.

### Rollup circuits
There are 3 circuit types used in Nata Network:
1. **Inner rollup circuit** verifies up to 28 single transaction proofs and performs required L2 state updates.

2. **Root rollup circuit** is referred to as a rollup circuit in the smart contract code/comments.
This circuit verifies up to 32 inner rollup proofs.

1. **Root verifier circuit** verifies a single root rollup proof.

The inner rollup/root rollup design was introduced in order to enable better parallelism.

Knowledge of the existence of the _root verifier circuit_ is likely beyond the scope of this audit.
It is used to simplify the computations required by the smart contract PLONK verifier.
All other circuits/proofs are created using the “Turbo PLONK” ZK-SNARK proving system.

Regular PLONK proofs are slower to construct but faster to verify compared to Turbo PLONK proofs.
The _root verifier circuit_ is made using regular PLONK, and it verifies the Turbo PLONK _root rollup circuit_.
This reduces the computations (and gas costs) required to verify the proof on-chain.

Nata Network uses recursive ZK-SNARK constructions to ensure that only the final ZK-SNARK proof in the transaction stack needs to be verified on-chain. If the root verifier proof is correct, one can prove inductively that all other proofs in the transaction stack are correct.

## L2 transaction types

An Nata Network rollup block contains up to 896 individual user transactions, which represent one of seven transaction types.
Each transaction type is defined via a _proofId_ variable attached to the transaction.

| proofId | transaction type | description                                                                                    |
| ------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| 0       | padding          | An empty transaction - present when there are not enough user transactions to fill the block   |
| 1       | deposit          | Converts public L1 ETH/ERC20 tokens into value notes                                           |
| 2       | withdraw         | Converts value notes into public ETH/ERC20 tokens on L1                                        |
| 3       | spend            | Private L2 transaction - converts value notes into different value notes                       |
| 4       | account          | Creates a user account note                                                                    |

### Anatomy of an L2 transaction

Each user transaction in the rollup block will have 8 `uint256` variables associated with it, present in the transaction calldata when `processRollup(...)` is called.
While represented as a `uint256` in the smart contract, these variables are big integers taken modulo the BN254 elliptic curve group order.
This is verified in StandardVerifier.sol.
Not all fields are used by all transaction types.

| publicInput | name            | description                                                                         |
| ----------- | --------------- | ----------------------------------------------------------------------------------- |
| 0           | proofId         | Defines the transaction type (checked in the rollup ZK-SNARK)                       |
| 1           | noteCommitment1 | The 1st note created by the transaction (if applicable)                             |
| 2           | noteCommitment2 | The 2nd note created by the transaction (if applicable)                             |
| 3           | nullifier1      | The 1st nullifier for any notes destroyed by the transaction (if applicable)        |
| 4           | nullifier2      | The 2nd nullifier for any notes destroyed by the transaction (if applicable)        |
| 5           | publicValue     | Amount being deposited/withdrawn (if applicable)                                    |
| 6           | publicOwner     | Ethereum address of a user depositing/withdrawing funds (if applicable)             |
| 7           | assetId         | 30-bit variable that represents the asset being deposited/withdrawn (if applicable) |

As not all fields are used by all transaction types, a custom encoding algorithm is used to reduce the calldata payload of these transactions. Transactions are decoded in Decoder.sol.

### Data included in a rollup transaction

When the `processRollup(...)` function is called, the input variable bytes calldata `encodedProofData` contains the core information required to validate and process an Nata Network rollup block.

Due to significant gas inefficiencies in the Solidity ABI decoding logic, custom encoding is used and the overall data structure is wrapped in a bytes variable.

The proofData can be split into 3 key components:

1. **Rollup header** - a fixed-size block of data that records the key properties of the rollup block.
2. **Transaction data** - a variable-size block that records the encoded user transaction data
3. **PLONK proof** - fixed-size block of data that contains a PLONK ZK-SNARK validity proof that proves the L2 transaction logic has been correctly followed.

Rollup Header Structure

| byte range      | num bytes | name                                     | description                                                                                                                                                                  |
| --------------- | --------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x00 - 0x20     | 32        | rollupId                                 | Unique rollup block identifier. Equivalent to block number                                                                                                                   |
| 0x20 - 0x40     | 32        | rollupSize                               | Max number of transactions in the block                                                                                                                                      |
| 0x40 - 0x60     | 32        | dataStartIndex                           | Position of the next empty slot in the Nata Network _dataTree_                                                                                                                       |
| 0x60 - 0x80     | 32        | oldDataRoot                              | Root of the _dataTree_ prior to rollup block’s state updates                                                                                                                  |
| 0x80 - 0xa0     | 32        | newDataRoot                              | Root of the _dataTree_ after rollup block’s state updates                                                                                                                     |
| 0xa0 - 0xc0     | 32        | oldNullRoot                              | Root of the nullifier tree prior to rollup block’s state updates                                                                                                             |
| 0xc0 - 0xe0     | 32        | newNullRoot                              | Root of the nullifier tree after rollup block’s state updates                                                                                                                |
| 0xe0 - 0x100    | 32        | oldDataRootsRoot                         | Root of the tree of _dataTree_ roots prior to rollup block’s state updates                                                                                                    |
| 0x100 - 0x120   | 32        | newDataRootsRoot                         | Root of the tree of _dataTree_ roots after rollup block’s state updates                                                                                                       |
| 0x120 - 0x140   | 32        | oldDefiRoot                              | Root of the _defiTree_ prior to rollup block’s state updates                                                                                                                  |
| 0x140 - 0x160   | 32        | newDefiRoot                              | Root of the _defiTree_ after rollup block’s state updates                                                                                                                     |
| 0x160 - 0x560   | 1024      | bridgeCallDatas[NUMBER_OF_BRIDGE_CALLS]  | Size-32 array of `bridgeCallDatas` for bridges being called in this block. If `bridgeCallData` == 0, no bridge is called.                                                    |
| 0x560 - 0x960   | 1024      | depositSums[NUMBER_OF_BRIDGE_CALLS]      | Size-32 array of deposit values being sent for bridges being called in this block                                                                                            |
| 0x960 - 0xb60   | 512       | assetIds[NUMBER_OF_ASSETS]               | Size-16 array of the assetIds for assets being deposited/withdrawn/used to pay fees in this block                                                                            |
| 0xb60 - 0xd60   | 512       | txFees[NUMBER_OF_ASSETS]                 | Size-16 array of transaction fees paid to the rollup beneficiary, denominated in each assetId                                                                                |
| 0xd60 - 0x1160  | 1024      | interactionNotes[NUMBER_OF_BRIDGE_CALLS] | Size-32 array of defi interaction result commitments that must be inserted into the _defiTree_ at this rollup block                                                           |
| 0x1160 - 0x1180 | 32        | prevDefiInteractionHash                  | A SHA256 hash of the data used to create each interaction result commitment. Used to validate correctness of interactionNotes                                                |
| 0x1180 - 0x11a0 | 32        | rollupBeneficiary                        | The address that the fees from this rollup block should be sent to. Prevents a rollup proof being taken from the transaction pool and having its fees redirected             |
| 0x11a0 - 0x11c0 | 32        | numRollupTxs                             | Number of “inner rollup” proofs used to create the block proof. “inner rollup” circuits process 3-28 user txns, the outer rollup circuit processes 1-28 inner rollup proofs. |

N.B. our documentation will sometimes refer to a “note” as a “commitment” (they are effectively synonyms in our architecture).

## Security properties of Nata Network

The tokens/MATIC in every un-spent value note in the _dataTree_ must be fully collateralised on-chain.
That is, the _RollupProcessor.sol_ contract must own enough ERC20 tokens/MATIC to cover the value represented in all of its un-spent notes.

Consequently, whenever a user creates a deposit transaction, they must have previously transferred/approved an equivalent amount of MATIC/tokens to _RollupProcessor.sol_.

It should also not be possible for an attacker to create value notes that are linked to MATIC/tokens deposited by a different user without their express permission.

More generally it is essential that front-running attacks are not possible.
Front-running attacks are attacks where an attacker takes a transaction out of the transaction pool and manipulates it to re-route value to/from an account not intended by the original transaction sender.

Value can also be deposited to the system via defi interactions.
When claim notes are converted into value notes, an equivalent amount of MATIC/tokens must have been deposited into the bridge by a defi interaction (described in the next section).

When value is extracted from _RollupProcessor.sol_, an equivalent amount of value recorded in value notes must have been destroyed.

Assuming the cryptography is correct, this means that in `processRollup(...)`’s call-data, there must be a withdraw transaction whose value field matches the amount being withdrawn.

Alternatively, value can be extracted if the rollup header contains a non-zero value inside the `depositSums` array (this implies that value notes have been converted into claim notes and we are instructing the rollup to send tokens to a specified bridge contract).

## Encoding and Decoding of Proof Data

For info about proof data encoding check out documentation of Decoder.sol contract.
