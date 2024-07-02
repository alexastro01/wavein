"use client";

import React, { useEffect } from "react";
import FlowingBalance from "./FlowingBalance";
import Address from "./Address";
import { AddressStreamingCard } from "./AddressStreamingCard";
import StreamAnimation from "./StreamAnimation";
import { WaveInData } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { WaveInDetailsDialog } from "./WaveInDetailsDialog";
import { WaveInDetailsDrawer } from "./WaveInDetailsDrawer";
import { useReadContract } from "wagmi";
import { usdcxAbi } from "@/abi/USDCx";
import { USDCX_CONTRACT_ADDRESS_SEPOLIA } from "@/utils/constants";
import { parseEther } from "viem";

const WaveInView = ({
  dueDate,
  reason,
  payer,
  payee,
  expectedAmount,
  requestId,
  currencyAddress,
  expectedFlowRate,
  currentBalance
}: WaveInData) => {

  const [unwrapSuccess, setUnWrapSuccess] = React.useState(false);
  const [isUnwrapLoading, setIsUnwrapLoading] = React.useState(false);



  useEffect(() => {
    if (unwrapSuccess) {
      setUnWrapSuccess(false);
    }
    console.log(`----Current balance in WaveinView.tsx----`)
    console.log(currentBalance)
   }, [unwrapSuccess, currentBalance]);

  return (
    <div className="flex flex-col items-center p-4 mt-8 space-y-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Wavein Details</CardTitle>
         </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{reason}</p>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-4">
        <AddressStreamingCard address={payer} receiver={false} />
        <StreamAnimation />
        <AddressStreamingCard address={payee} receiver={true} />
      </div>
      
      <WaveInDetailsDrawer 
        dueDate={dueDate}
        expectedAmount={expectedAmount}
        requestId={requestId}
        currencyAddress={currencyAddress}
        expectedFlowRate={expectedFlowRate}
        reason={reason}
        payee={payee}
        payer={payer}
        balance={parseEther(currentBalance.toString())}
        currentBalance={currentBalance}


      />
     
    </div>
  );
};


export default WaveInView;
