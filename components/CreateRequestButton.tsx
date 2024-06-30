import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { generateRequestParameters } from "@/utils/generateRequestParamaters";
import { generateRequestParamatersParams } from "@/types/types";
import { TOKEN_ADDRESS_SEPOLIA, USDCX_CONTRACT_ADDRESS_SEPOLIA } from "@/utils/constants";
import { useWalletClient } from "wagmi";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { calculateUSDCPerSecond } from "@/utils/getUSDCperSecond";
import { parseEther } from "viem";
import { useToast } from "./ui/use-toast";


const CreateRequestButton = ({
  payeeIdentity,
  payerIdentity,
  expectedAmount,
  dueDate,
  reason,
  expectedFlowRate,
  setLinkState,
  setIsConfirmed
}: generateRequestParamatersParams & {
   setLinkState: React.Dispatch<React.SetStateAction<string>>,
   setIsConfirmed:React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data: walletClient } = useWalletClient();

  const { toast } = useToast()

  const [loading, setLoading] = useState(false);


  const handleClick = async () => {

    if (

      !payerIdentity ||
      !expectedAmount ||
      !dueDate ||
      !reason
    ) {
      alert("Please fill in all the fields");
      return;
    }
    
    setLoading(true)

    try{
    const web3SignatureProvider = new Web3SignatureProvider(walletClient);

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
    toast({
      variant: "default",
      title: "1/3",
      description: "Creating Request...",

    })


    const request = await requestClient.createRequest(requestParameters);
    toast({
      variant: "default",
      title: "2/3",
      description: "Request Created Sucessfully ! Confirming Request...",

    })


    const confirmedRequestData = await request.waitForConfirmation();
    toast({
      variant: "default",
      title: "3/3",
      description: "Request Confirmed",

    })

    console.log(confirmedRequestData.requestId);
      
    setLinkState(`/confirm-wavein/${confirmedRequestData.requestId}`)
    setIsConfirmed(true)


    toast({
      description: "Request Created Successfully",
    })

  } catch(error) {
    alert(error)
  } finally {
    setLoading(false)
  }
  };


  useEffect(() => {
   console.log(dueDate)
  }, [dueDate])

  return (
    <Button onClick={handleClick} className="w-full mt-4" disabled={loading}>
      {
      loading ? "Loading..." : "Create"
      }
    </Button>
  );
};

export default CreateRequestButton;
