"use client";


import React, { useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { flowSenderAbi } from "@/abi/Flowsender";
import { Button } from "@/components/ui/button";
import { parseEther } from "viem";
import Image from "next/image";
import { DialogFooter } from "./ui/dialog";
import Address from "./Address";

type StartStreamProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}


const StartStream = ({
  setStep
}: StartStreamProps) => {
  const { data: hash, writeContract, error } = useWriteContract();

  async function setFlowrate() {
  
    writeContract({
      //contract address
      address: "0x88ab63a8726EB0E475c3D84505898F8e70c051ee",
      abi: flowSenderAbi,
      functionName: "createStream",
      //flowrate, receiver
      args: [
        parseEther("0.0000000001"),
        "0x3C7fBd61f260C19602990817C005132d241f24b6"     
      ],
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
        isConfirmed && setStep(2)
    }, [isConfirmed])
  


  return (
    <div className="">
    <div className=" text-xl font-semibold mb-4">
      Stream 500
      USDCX to <Address address={"0x3C7fBd61f260C19602990817C005132d241f24b6"} size="medium" />
    </div>
    <DialogFooter>
      
      <Button className="w-full" onClick={setFlowrate} disabled={isConfirming}>{isConfirming ? 
 "Loading..." 
 : "Confirm" }</Button>
    </DialogFooter>
  </div>
  )
};

export default StartStream;
