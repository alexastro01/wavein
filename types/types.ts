export type SupportedNetwork = "sepolia" | "mumbai"


export type generateRequestParamatersParams = {
    payeeIdentity: string,
    payerIdentity: string,
    expectedAmount: string,
    feeRecipient?: string,
    tokenAddress?: string,
    dueDate: string,
    reason: string

}