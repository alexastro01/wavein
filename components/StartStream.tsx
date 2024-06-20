"use client";


import React from "react";
import { useWriteContract } from "wagmi";
import { flowSenderAbi } from "@/abi/Flowsender";
import { Button } from "@/components/ui/button";
import { parseEther } from "viem";

type StartStreamProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}


const StartStream = ({
  setStep
}: StartStreamProps) => {
  const { data: hash, writeContract, error } = useWriteContract();

  async function setFlowrate() {
  
    writeContract({
      address: "0x88ab63a8726EB0E475c3D84505898F8e70c051ee",
      abi: flowSenderAbi,
      functionName: "createStream",
      //token, receiver, flowrate
      args: [
        parseEther("0.0000000001"),
        "0x404CE8cb8cEC051d2Ef416D97E8d72D466Cb55dE"     
      ],
    });
  }





  return <div>
    <Button onClick={setFlowrate}>Set </Button>
    {error && <div>Error: {error.message}</div>}
  </div>;
};

export default StartStream;
