import React, { useEffect } from "react";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { flowSenderAbi } from "@/abi/Flowsender";
import { parseEther } from "viem";

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
        address: "0x88ab63a8726EB0E475c3D84505898F8e70c051ee",
        abi: flowSenderAbi,
        functionName: "gainUsdcX",
        //msg.sender
        args: []
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
   : "Wrap" }</Button>
      </DialogFooter>
    </div>
  );
};

export default ExecuteWrap;
