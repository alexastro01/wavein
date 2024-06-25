"use client";

import React from "react";
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

const WaveInView = ({
  dueDate,
  reason,
  payer,
  payee,
  expectedAmount,
  requestId,
  currencyAddress,
  expectedFlowRate,
}: WaveInData) => {

  const { data: balance } = useReadContract({
    address: USDCX_CONTRACT_ADDRESS_SEPOLIA as `0x${string}`,
    abi: usdcxAbi,
    functionName: 'balanceOf',
    args: [payee as `0x${string}`],
  })

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
        balance={balance as bigint}
      />
     
    </div>
  );
};


export default WaveInView;
