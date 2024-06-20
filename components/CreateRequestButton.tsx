import React from "react";
import { Button } from "./ui/button";
import { generateRequestParameters } from "@/utils/generateRequestParamaters";
import { generateRequestParamatersParams } from "@/types/types";
import { TOKEN_ADDRESS_SEPOLIA } from "@/utils/constants";
import { useWalletClient } from "wagmi";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { RequestNetwork } from "@requestnetwork/request-client.js";

const CreateRequestButton = ({
  payeeIdentity,
  payerIdentity,
  expectedAmount,
  dueDate,
  reason,
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

    const requestParameters = generateRequestParameters({
      payeeIdentity,
      payerIdentity,
      expectedAmount,
      dueDate,
      reason,
      tokenAddress: TOKEN_ADDRESS_SEPOLIA,
    });

    console.log("Request Parameters:", requestParameters);

    const request = await requestClient.createRequest(requestParameters);
    alert("Request created successfully");

    const confirmedRequestData = await request.waitForConfirmation();

    console.log(confirmedRequestData);

    confirmedRequestData.extensions
    alert("Request confirmed successfully");
  };

  return (
    <Button onClick={handleClick} className="w-full mt-4">
      Create
    </Button>
  );
};

export default CreateRequestButton;
