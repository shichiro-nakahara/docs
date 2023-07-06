# Fees

## Fee Calculation

Fees on Nata Network are calculated depending on the user action.

## Simple Payments

Simple transactions have the basic cost of being included in a rollup.

Being included in a rollup also has two components:

a) Rollup verification costs

Total rollup verification cost is approximately 550,000 gas. A transaction's share of total verification costs is calculated by dividing this total rollup verification by the number of transactions. For an 896 transaction rollup, the base fee is 614 gas.

b) Call data costs

Call data has to be posted to Polygon to update Nata Network's state tree with the new offchain system state. The cost of posting call data is approximately 15,376 gas, less than the base transaction cost on Polygon.

**This means the cost of executing a private transaction is always cheaper than doing a public transaction on Polygon.**