import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWalletClient,
  useWriteContract,
} from "wagmi";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { USDCX_CONTRACT_ADDRESS_SEPOLIA } from "@/utils/constants";
import { usdcxAbi } from "@/abi/USDCx";
import { parseEther } from "viem";
import { DrawerClose } from "./ui/drawer";
import { useToast } from "./ui/use-toast";

type UnwrapUSDCXProps = {
  usdcxBalance: number;
  requestId: string;
};

const UnwrapUSDCX = ({ usdcxBalance, requestId }: UnwrapUSDCXProps) => {
  const [amount, setAmount] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const { data: hash, writeContract, error } = useWriteContract();
  const { address } = useAccount();
  const { toast } = useToast();

  const { data: walletClient } = useWalletClient();

  async function UnwrapUSDCXAndDeclarePaymentReceived() {
    const web3SignatureProvider = new Web3SignatureProvider(walletClient);

    const requestClient = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL: "https://sepolia.gateway.request.network/",
      },
      signatureProvider: web3SignatureProvider,
    });

    const request = await requestClient.fromRequestId(requestId);

    enum TYPE {
      ETHEREUM_ADDRESS = "ethereumAddress",
      ETHEREUM_SMART_CONTRACT = "ethereumSmartContract",
    }

    await request.declareReceivedPayment(
      amount.toString(),
      `Amount received:  ${amount}`,
      {
        type: TYPE.ETHEREUM_ADDRESS,
        value: address as `0x${string}`,
      }
    );

    alert("Payment declared");

   writeContract({
      //contract address
      address: USDCX_CONTRACT_ADDRESS_SEPOLIA,
      abi: usdcxAbi,
      functionName: "downgrade",
      //flowrate, receiver
      args: [parseEther(amount)],
    });


  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
        alert("Transaction success");
    }
  }, [isConfirmed]);

  return (
    <div>
      <Input
        placeholder="Enter amount"
        value={amount}
        onChange={handleChange}
      />
      <DrawerClose asChild>
        <Button
          disabled={
            parseFloat(amount) > usdcxBalance ||
            amount === "" ||
            parseFloat(amount) <= 0 ||
            isConfirming
          }
          onClick={UnwrapUSDCXAndDeclarePaymentReceived}
          className="w-full mt-2"
        >
          {isConfirming ? "Loading..." : "Unwrap USDCX to USDC"}
        </Button>
      </DrawerClose>
    </div>
  );
};

export default UnwrapUSDCX;
