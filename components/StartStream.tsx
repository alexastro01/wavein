"use client";


import React, { use, useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CFAv1ForwarderAbi } from "@/abi/CFAv1Forwarder";
import { Button } from "@/components/ui/button";
import { parseEther } from "viem";
import Image from "next/image";
import { DialogFooter } from "./ui/dialog";
import Address from "./Address";
import { CFAv1Forwarder_CONTRACT_ADDRESS_SEPOLIA, USDCX_CONTRACT_ADDRESS_SEPOLIA } from "@/utils/constants";

type StartStreamProps = {
  payee: string,
  expectedAmount: string | number,
  expectedFlowRate: string,
  setStep: React.Dispatch<React.SetStateAction<number>>;
}


const StartStream = ({
  setStep,
  expectedAmount,
  payee,
  expectedFlowRate
}: StartStreamProps) => {
  const { data: hash, writeContract, error } = useWriteContract();
  const {address} = useAccount();
  async function setFlowrate() {
  
    writeContract({
      //contract address
      address: CFAv1Forwarder_CONTRACT_ADDRESS_SEPOLIA,
      abi: CFAv1ForwarderAbi,
      functionName: "createFlow",
      //flowrate, receiver
      args: [
        //CONTRACT ADDRESS USDCX
        USDCX_CONTRACT_ADDRESS_SEPOLIA,
        //SENDER
        address as `0x${string}`,
        //RECEIVER
        payee as `0x${string}`,
        //FLOW RATE ( INT / SECOND )
        BigInt(expectedFlowRate),
        //OPTIONAL BYTES
        "0x"
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
      Stream {expectedAmount}{
        " "
      }
      USDCX to <Address address={payee} size="medium" />
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
