import React, { useEffect } from "react";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { usdcxAbi } from "@/abi/USDCx";
import { parseEther } from "viem";
import { USDCX_CONTRACT_ADDRESS_SEPOLIA } from "@/utils/constants";

type ExecuteWrapProps = {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ExecuteWrap = ({
    setStep
}: ExecuteWrapProps) => {

    const { data: hash, writeContract, error, isSuccess, isPending } = useWriteContract();
    const {address} = useAccount();

    async function setFlowrate() {
    
      writeContract({
        address: USDCX_CONTRACT_ADDRESS_SEPOLIA,
        abi: usdcxAbi,
        functionName: "upgrade",
        //msg.sender
        args: [parseEther("10")]
      });
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })


    useEffect(() => {
    error && alert(error.message)
    }, [error])

    useEffect(() => {
        isConfirmed && setStep(1)
    }, [isConfirmed])
  
  return (
    <div className="">
      <div className="flex text-xl font-semibold mb-4">
        Wrap 500{" "}
        <span className="mx-1">
          <Image src="/usdc.png" width={30} height={30} alt="USDC" />{" "}
        </span>{" "}
        to USDCx
      </div>
      <DialogFooter>
      <Button className="w-full" onClick={setFlowrate} disabled={isConfirming}>{isConfirming ? 
   "Loading..." 
   : "Approve" }</Button>
        <Button className="w-full" onClick={setFlowrate} disabled={isConfirming}>{isConfirming ? 
   "Loading..." 
   : "Wrap" }</Button>
  
      </DialogFooter>
    </div>
  );
};

export default ExecuteWrap;
