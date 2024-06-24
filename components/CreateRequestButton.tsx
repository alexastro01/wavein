import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { generateRequestParameters } from "@/utils/generateRequestParamaters";
import { generateRequestParamatersParams } from "@/types/types";
import { TOKEN_ADDRESS_SEPOLIA, USDCX_CONTRACT_ADDRESS_SEPOLIA } from "@/utils/constants";
import { useWalletClient } from "wagmi";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { calculateUSDCPerSecond } from "@/utils/getUSDCperSecond";
import { parseEther } from "viem";
const CreateRequestButton = ({
  payeeIdentity,
  payerIdentity,
  expectedAmount,
  dueDate,
  reason,
  expectedFlowRate
}: generateRequestParamatersParams) => {
  const { data: walletClient } = useWalletClient();


  const handleClick = async () => {
    if (
      !payeeIdentity ||
      !payerIdentity ||
      !expectedAmount ||
      !dueDate ||
      !reason
    ) {
      alert("Please fill in all the fields");
      return;
    }
    const web3SignatureProvider = new Web3SignatureProvider(walletClient || (window.ethereum as any));

    const requestClient = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL: "https://sepolia.gateway.request.network/",
      },
      signatureProvider: web3SignatureProvider,
    });

    const flowRate = calculateUSDCPerSecond(dueDate.toString(), parseInt(expectedAmount));
    
    

    const requestParameters = generateRequestParameters({
      payeeIdentity,
      payerIdentity,
      expectedAmount,
      dueDate,
      reason,
      tokenAddress: USDCX_CONTRACT_ADDRESS_SEPOLIA,
      // parseEther(flowRate.toString()).toString()
      expectedFlowRate: parseEther(flowRate.toString()).toString()
    });

    console.log("Request Parameters:", requestParameters);

    const request = await requestClient.createRequest(requestParameters);
    alert("Request created successfully");

    const confirmedRequestData = await request.waitForConfirmation();

    console.log(confirmedRequestData);

    confirmedRequestData.extensions
    alert("Request confirmed successfully");
  };


  useEffect(() => {
   console.log(dueDate)
  }, [dueDate])

  return (
    <Button onClick={handleClick} className="w-full mt-4">
      Create
    </Button>
  );
};

export default CreateRequestButton;
