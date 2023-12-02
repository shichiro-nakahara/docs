# User Guide

Welcome to Cross-Chain Nata Router!

Here you can find all information about Nata Router and how to use it safely. We recommend going through the docs before using the app.

# Overview

Nata Router is a cross-chain privacy bridge powered by Stargate, LayerZero, and Nata Network.

Users can privately bridge tokens cross-chain and protect their transaction data from the public. Shielding a token means having it under a zkSNARK (zero-knowledge proof cryptography) shield that protects the user’s privacy. The docs refer to 'Shielding' and 'Depositing' interchangeably.

## Deposit Funds

### Step 1: Connect zkAccount
When you land on the router app, click on “Connect zkAccount” to be taken to the wallet connection screen.

![image](/img/router-step-1-connect.png)

### Step 2: Sign message to retrieve zkAddress
You will be prompted to sign a message to retrieve your Nata Network zkAccount address.

![image](/img/router-step-2-sign.png)

![image](/img/router-step-3-connected.png)

### Step 3: Source
Under 'FROM', choose your network and token.

![image](/img/router-step-4-choose-network.png)
![image](/img/router-step-5-select-token.png)

### Step 4: Amount
Type the amount you want to transfer. Wait for the quote to load. Click on the arrow to view the detailed fee breakdown.

![image](/img/router-step-6-review-quote.png)
![image](/img/router-step-7-fee-breakdown.png)

### Step 5: Accept disclaimer
Click 'SEND' and accept disclaimer.

![image](/img/router-step-8-disclaimer.png)

### Step 6: Token Approval
Sign approval to spend token. Sign the deposit proof.

![image](/img/router-step-9-approve.png)
![image](/img/router-step-10-sign-proof.png)

### Step 7: Sign LayerZero TX
Sign LayerZero transaction to start transfer. Transfers should take less than 120 seconds.

### Step 8: Open zkWallet
Click on your zkAddress to open your zkWallet.

![image](/img/router-step-11-wallet.png)

### Step 9: View transaction history
Click on 'Transaction History'. Your deposit can be spent after you have received two checkmarks. ( ✅ ✅ )

![image](/img/router-step-12-wallet-info.png)
![image](/img/router-step-13-transaction-history.png)

## Withdraw Funds

### Step 1: Source
Under 'FROM', choose your 'Nata Network' as your source chain. Choose your zkToken.

### Step 2: Amount
Type the amount you want to transfer. Wait for the quote to load. Click on the arrow to view the detailed fee breakdown.

### Step 3:
Coming soon...

## zkRecieve & zkSend
Users can use zkSend to privately transfer assets inside Nata Network. Provide the sender with your @alias or natanetwork:0x1111...1111 address.


![image](/img/router-step-14-receive.png)

## Community Support

For any remaining questions and live troubleshooting help, visit our [Twitter](https://twitter.com/nata_network_io) or [Discord](https://discord.gg/7cswMvWeNc) for support.
