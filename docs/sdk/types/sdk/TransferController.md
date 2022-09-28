```ts
export declare class TransferController {
    readonly userId: GrumpkinAddress;
    private readonly userSigner;
    readonly assetValue: AssetValue;
    readonly fee: AssetValue;
    readonly recipient: GrumpkinAddress;
    readonly recipientSpendingKeyRequired: boolean;
    private readonly core;
    private readonly requireFeePayingTx;
    private proofOutputs;
    private feeProofOutputs;
    private txIds;
    constructor(userId: GrumpkinAddress, userSigner: Signer, assetValue: AssetValue, fee: AssetValue, recipient: GrumpkinAddress, recipientSpendingKeyRequired: boolean, core: CoreSdkInterface);
    createProof(): Promise<void>;
    exportProofTxs(): import("@aztec/barretenberg/rollup_provider").Tx[];
    send(): Promise<TxId>;
    awaitSettlement(timeout?: number): Promise<void>;
}
```