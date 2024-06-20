import { generateRequestParamatersParams } from "@/types/types";
import { Types, Utils } from "@requestnetwork/request-client.js";
import {IRequestCreateParameters} from "@/types/interfaces";
import { SupportedNetwork } from "@/types/types";
import { TOKEN_ADDRESS_SEPOLIA } from "./constants";
import { ICreateRequestParameters } from "@requestnetwork/request-client.js/dist/types";
// const payeeIdentity = '0x7eB023BFbAeE228de6DC5B92D0BeEB1eDb1Fd567';
// const payerIdentity = '0x519145B771a6e450461af89980e5C17Ff6Fd8A92';
// const paymentRecipient = payeeIdentity;
// const feeRecipient = '0x0000000000000000000000000000000000000000';


export function generateRequestParameters({
  payeeIdentity,
  payerIdentity,
  expectedAmount,
  tokenAddress,
  dueDate,
  reason,
}: generateRequestParamatersParams): ICreateRequestParameters {
  const requestCreateParameters: ICreateRequestParameters = {
    requestInfo: {
      
      // The currency in which the request is denominated
      currency: {
        type: Types.RequestLogic.CURRENCY.ERC20,
        value: tokenAddress || TOKEN_ADDRESS_SEPOLIA,
        network: 'sepolia',
      },
      
      // The expected amount as a string, in parsed units, respecting `decimals`
      // Consider using `parseUnits()` from ethers or viem
      expectedAmount: expectedAmount,
      
      // The payee identity. Not necessarily the same as the payment recipient.
      payee: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payeeIdentity,
      },
      
      // The payer identity. If omitted, any identity can pay the request.
      payer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payerIdentity,
      },
      
      // The request creation timestamp.
      timestamp: Utils.getCurrentTimestampInSecond(),
    },
    
    // The paymentNetwork is the method of payment and related details.
    paymentNetwork: {
      id: Types.Extension.PAYMENT_NETWORK_ID.ERC777_STREAM,
      parameters: {
        expectedFlowRate: '0x0000000000000000000000000000000000000001',
        expectedStartDate: '0',
        paymentAddress: '0x0000000000000000000000000000000000000002',
        refundAddress: '0x0000000000000000000000000000000000000003',
        salt: 'ea3bc7caf64110ca',
      },
    },
    
    // The contentData can contain anything.
    // Consider using rnf_invoice format from @requestnetwork/data-format
    contentData: {
      reason: reason,
      dueDate: dueDate,
    },
    
    // The identity that signs the request, either payee or payer identity.
    signer: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: payeeIdentity,
    },

    
    


}
return requestCreateParameters;

}
