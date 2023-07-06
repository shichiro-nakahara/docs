---
title: Glossary
---

### Account

An Nata Network account is the user primitive on the network. See the [Accounts](how-natanetwork-works/accounts.mdx) page for more information.

### Account Key

See [Viewing Key](#viewing-key).

### Account Migration

Used when a user loses access to their [Account Keys](#account-key). This allows a user to keep their alias while setting new account key, spending key and recovery key.

**Accounts can only be migrated 1 time.**

### Account Note

The accounts registered by users on Nata Network are represented by account notes. An account note associates spending keys and aliases with an account. The spending key is used to sign transactions.

### Account Recovery

Used when a user loses access to all of their registered [Spending keys](#spending-key). Note that a user must have the [viewing key](#viewing-key) in order to recover an account.

### Account Registration

Registering an account on Nata Network associates the account public key with an alias, a spending key and an optional recovery key. A recovery key must be added at registration in order to take advantage of [account recovery](#account-recovery).

### Alias

The account public key is associated with a human-readable alias when the account registers a new signing key (see below). The alias can be anything (20 alphanumeric, lowercase characters or less) as long as it hasn't been claimed yet.

### Asset Ids

Asset Ids are unique numbers that correspond to various assets in Nata Network.

| Asset | Id |
| --- | --- |
| MATIC | 0 |
| DAI | 1 |
| WETH | 2 |
 
### Barretenberg

Nata Network's cryptography back-end. Refer to the graphic at the top of [this page](https://medium.com/aztec-protocol/explaining-the-network-in-aztec-network-166862b3ef7d) to see how it fits in the Nata Network architecture.

### Falafel

The Nata Network client. See [Sequencer](#sequencer) for more info.

Refer to the graphic at the top of [this page](https://medium.com/aztec-protocol/explaining-the-network-in-aztec-network-166862b3ef7d) to see how it fits in the Nata Network architecture.

### Halloumi

Nata Network's Proof creation service. Refer to the graphic at the top of [this page](https://medium.com/aztec-protocol/explaining-the-network-in-aztec-network-166862b3ef7d) to see how it fits in the Nata Network architecture.

### Privacy Key

See [Viewing Key](#viewing-key).

### Rollup Processor Contract

This is the smart contract on Polygon that holds user deposits, facilitates interactions with other Polygon contracts from Nata Network and processes Nata Network rollup blocks.

### Sequencer

This is also called the Rollup Processor.

This service is responsible for:

- Watching for rollup blocks on Polygon and updating the representation of Nata Network state accordingly
- Listening for and storing transactions from users, verifying they're valid, have correct fees, etc.
- Constructing new rollups at the appropriate time or when enough transactions are received
- Publishing of rollups to an Polygon chain

Refer to the graphic at the top of [this page](https://medium.com/aztec-protocol/explaining-the-network-in-aztec-network-166862b3ef7d) to see how it fits in the Nata Network architecture.

### Spending Key

A specific private key registered to an account with permission to spend asset notes on behalf of that account. See the [Accounts](how-natanetwork-works/accounts.mdx) page for more information.

### Signing Key

See [Spending Key](#spending-key).

### Value Notes

Asset notes (or value notes) are representations of asset in Nata Network. They are sent around the network via transactions.

### Viewing Key

Also called the Account key, the privacy key or the decryption key.

This is the private key that is associated with plain (unregistered) Nata Network account. This key is used to decrypt notes associated with the account. For an unregistered Nata Network account, it is also used to spend notes. It can be used to [register](#account-registration) an account 1 time.

See the [Accounts](how-natanetwork-works/accounts.mdx) page for more information.
