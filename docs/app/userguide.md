# User Guide

Welcome to PolyAztec!

Here you can find all information about PolyAztec and how to use it safely. We recommend going through the docs before using the app.

# Overview

PolyAztec is a privacy app built on top of Polygon.

Polygon users can use it to shield tokens and protect their transaction data from the public. Shielding a token means having it under a zkSNARK (zero-knowledge proof cryptography) shield that protects the user’s privacy. Sending and receiving a token is anonymous, and does not publish any of the transaction’s data publicly.

# Shielding Funds

### Step 1: Start shielding
When you land on the homepage, click on “Shield Now” to be taken to the wallet connection screen.

![image](/img/step-1-start-shielding.png)

### Step 2: Connect Wallet
You will be prompted to sign a message to retrieve your PolyAztec address. Begin by connecting your wallet with MetaMask or other wallets via WalletConnect.

![image](/img/step-2-retrieve-polyaztec-address.png)

![image](/img/step-2-connect-wallet.png)

### Step 3: Sign messages
You will be required to sign 2 messages to ensure your signature is stable.

![image](/img/step-3-sign-message.png)

### Step 4: Sign message to retrieve a spending key
You will be prompted to sign a message to retrieve a spending key.

![image](/img/step-4-spending-key.png)

### Step 5: Save your data
This data will help you login if you forget your details. Store it somewhere safe but accessible.

![image](/img/step-5-save-data.png)

### Step 6: Pick alias and initial deposit amount
Your username is a recognizable alias that makes it easy for your friends to send you crypto.
- Write it down! PolyAztec does not keep a record, it is all encrypted. Only you know it.
- If you've forgotten your alias, you cannot re-register a new one.

Take advantage of your registration transaction fee and make a feeless deposit. You may choose to deposit MATIC, DAI or WETH.

If you registered with an empty wallet, or your wallet has insufficient assets, you may change to another wallet (while still connected to existing one) and complete the deposit.

![image](/img/step-6-pick-alias-deposit.png)

### Step 7: Complete registration
To complete your registration, PolyAztec will prompt you to do the following:
1. If you have selected an asset other than MATIC, permit the PolyAztec contract to access your funds.
2. Transfer assets to the PolyAztec contract.
3. After the above transaction settles, sign a message to allow your pending funds to be used in the PolyAztec register/deposit transaction.

Shortly after, a proof will be sent to the rollup and the process will be complete.

### Step 8: The Wallet page
As you noticed when you scroll down, your initial shield deposit is confirmed but not settled.

![image](/img/step-7-wallet-page.png)

It should show one green check ✅, which means the transaction has been sent to the Rollup Provider for settlement to Polygon.

Once you see ✅ ✅, the transaction is settled and your balance will show up under "available" in the “Net Worth” component up top of the Wallet page.

Note that “Net Worth” reflects the value of all your positions — liquid or illiquid — whereas “Available” funds reflects just your spendable balance.

These figures can therefore differ — don’t be alarmed.

![image](/img/step-7-settled.png)

This is how it looks once the initial registration and shield transaction have been confirmed and settled.

Congrats, now you have zkAssets! What can you do with shielded assets?

## Shield more
You can always add more funds to your account from the Wallet page by clicking on "Shield More."

![image](/img/step-post-shield-more.png)

It’s worth repeating deposit best practices:

- Do not deposit idiosyncratic amounts (e.g. 0.696969)
- Depositing many smaller quantities is better than depositing extremely large quantities
- Deposits are capped at 10,000 MATIC / 5 WETH / 10,000 DAI

![image](/img/step-post-shield-funds.png)

## Send
Send zkMATIC / zkWETH / zkDAI to other PolyAztec usernames or Polygon addresses.

Select "Withdraw to L1" to withdraw funds to Polygon, or "Send to L2" to send funds privately to another PolyAztec user.

![image](/img/step-post-withdraw-funds.png)

After making your selection, simply paste the recipient details into the recipient section. For L2 transactions (the recipient is a PolyAztec username), the recipient will get zkMATIC/WETH/DAI directly into their account balance. In case the recipient is a regular Polygon address, they will receive regular "unshielded" MATIC/WETH/DAI tokens to their wallet.

Once you’ve entered your amount and speed, click "Next"!

After confirming transaction details, click "Confirm Transaction".

![image](/img/step-post-withdraw-to-l1.png)

## On Security

Disclaimer: It is responsible for projects using bleeding-edge cryptography, to highlight the risks of use. Given the absence of an external audit, PolyAztec should be viewed as experimental software. The Aztec team has conducted two internal audits of the network. After patching the resultant security flaws, Aztec has high confidence in the soundness and security of our cryptography. Users are nonetheless reminded to use any new cryptographic system with extreme caution, and to remember that you do so at your own risk.

## Community Support

For any remaining questions and live troubleshooting help, visit our [Twitter](https://twitter.com/poly_aztec) for support.
