---
title: Getting Started
---

## Building on Aztec

There are two common ways that developers can start building on Aztec.

1. Build a user facing application that connects to the Aztec network via the Typescript SDK.
2. Build an Aztec Connect bridge that connects the Aztec network to Ethereum smart contracts.

We are also working on Noir, a domain specific language for creating and verifying proofs. There are some resources to learn more about this project at the bottom of the page.

:::note
The Aztec core engineering team has a regular release cadence that will occasionally introduce breaking changes. We are working on making this process more transparent and smoother for developers building on Aztec.

We typically have a code freeze on Thursday where recent changes are applied to the testnet. We test and monitor updates over the weekend and will push changes to mainnet if everything looks good.
:::

## Building with the SDK

The fastest way to get started developing on Aztec is using the public mainnet fork testnet.

### Testnet Development Configuration

1. Connect Metamask (or other Ethereum wallet) to the testnet
   1. Chain ID: `677868`
   2. RPC URL: `https://aztec-connect-testnet-eth-host.aztec.network:8545`
2. Get testnet funds
   1. Use the [testnet faucet](https://aztec-connect-testnet-faucet.aztec.network/).
   2. Ping [@critesjosh_](https://twitter.com/critesjosh_) or joshc#0001 on [the Aztec Discord](https://discord.com/invite/aztec) for larger amounts testnet ETH.
3. Install the SDK in your project.
   1. `npm install @aztec/sdk`
   2. If you are building a web interface, consider using [this frontend boilerplate code repo](https://github.com/joss-aztec/cra4-aztec-sdk-starter) to get started quickly
4. Interact with Aztec (optional, useful for cross-referencing)
   1. Use the testnet version of zk.money (https://aztec-connect-testnet.zk.money/)
   2. Use the `azteccli` command line tool. https://github.com/critesjosh/azteccli

Once you have testnet ETH and setup the SDK, you can start interacting with the Aztec network. You can start registering accounts, making deposits, doing transfers and withdrawals and other things supported by the [SDK](../sdk/overview.md).

You can see how to set up the SDK on the [setup page](../sdk/usage/setup.mdx) or in the command line repo (https://github.com/critesjosh/azteccli/blob/main/src/base.ts). The [Command Line Interface](./cli) page has more specific info about using the tool.

The [overview page](../sdk/overview.md) of the SDK section has more information about using the SDK.

:::note
Transaction times are typically slow to settle on the testnet since the testnet mimics mainnet behavior. If you want transactions to settle quickly, be sure to set the `TxSettlementTime` to `INSTANT`. `INSTANT` transactions settle within minutes rather than hours, they just require a larger fee.
:::

You can check the latest infrastructure and bridge contract addresses via the [testnet Falafel status API](https://api.aztec.network/aztec-connect-testnet/falafel/status).

### Aztec SDK Resources

- [Front end app boilerplate code repo](https://github.com/Globallager/aztec-frontend-boilerplate)
- [Getting Started with Aztec CLI / SDK](https://hackmd.io/NOtgWFSxS-Ko5mLlqt5GRw)
- [Aztec CLI](https://github.com/critesjosh/azteccli)
- [Testnet zk.money](https://aztec-connect-testnet.zk.money/)
- [Testnet block explorer](https://aztec-connect-testnet-explorer.aztec.network/)
- [Testnet Falafel status API](https://api.aztec.network/aztec-connect-testnet/falafel/status)
- [Aztec SDK on npm](https://www.npmjs.com/package/@aztec/sdk)
- [Aztec SDK on GitHub](https://github.com/AztecProtocol/aztec-connect/tree/master/sdk)

## Building an Aztec Connect Bridge Contract

Review the [Getting Started with Aztec Connect Bridges](./bridges) page for more details.

The [Aztec Connect bridges GitHub repository](https://github.com/AztecProtocol/aztec-connect-bridges) has the most up to date information about creating a bridge contract.

### Bridges Resources

- [ETHBogota workshop video on building bridges](https://youtu.be/029Vm6PAnrM?t=1822)
- [Element bridge explained](https://hackmd.io/@aztec-network/SJ7-6Rbfq)
- [Aztec Connect bridges GitHub repository](https://github.com/AztecProtocol/aztec-connect-bridges)

## Noir

Noir is a Domain Specific Language for SNARK proving systems. It can be used outside of Aztec or blockchain contexts. Noir will be used to create future versions of Aztec and as an integral part of the developer stack for building applications on Aztec.

It has been designed to use any ACIR compatible proving system. It's design choices are influenced heavily by Rust.

Read more about installing and writing Noir on [this page](noir).

### Noir Gotchas

If the program compilation fails, go into `nargo/Cargo.toml` and swap out `aztec_backend = ...` with the following:

```js title="nargo/Cargo.toml"
aztec_backend = { optional = true, git = "https://github.com/noir-lang/aztec_backend", rev = "d91c69f2137777cec37f692f98d075ae10e7a584", default-features = false, features = [
    "wasm-base",
] }
```

### Noir Resources

- [Official GitHub repo](https://github.com/noir-lang/noir)
- [The Noir Programming Language Book](https://noir-lang.github.io/book/index.html)
- [Getting Started with Noir Guide](https://hackmd.io/8jmyfuuTRWKr2w6rxr8HBw)
- [ETHBogota workshop video on Noir](https://youtu.be/029Vm6PAnrM?t=2872)
- [Basic Noir Example](https://github.com/vezenovm/basic_mul_noir_example)
- [Mastermind in Noir](https://github.com/vezenovm/mastermind-noir)

## Get in Touch

Join the [Aztec Discord](https://discord.gg/aztec).

### Discord Channels

- `#ethbogota` for the hackathon
- `#💻│aztec-connect` for Bridges + SDK support
- `#🖤│noir`

### Aztec Core Team Contacts

Please reach out with questions, comments, ideas, etc. Feedback is also appreciated.

| Name | Role | Discord | Telegram | Twitter | Email |
| --- | ---- | --- | --- | --- | --- |
| Josh | Developer Relations | joshc#0001 | @crites | [@critesjosh_](https://twitter.com/critesjosh_) | josh@aztecprotocol.com |
| Savio | Developer Relations | Globallager#4834 | @Globallager | [@globallager](https://twitter.com/globallager) | savio@aztecprotocol.com |
| Lasse | Smart Contract + Bridge Engineer | LHerskind#8376 | | [@HerskindLasse](https://twitter.com/herskindlasse) |lasse@aztecprotocol.com |
| Maxim | Engineer - Noir | vezzie#7609 | | [@maximvezenov](https://twitter.com/maximvezenov) | maxim@aztecprotocol.com |
