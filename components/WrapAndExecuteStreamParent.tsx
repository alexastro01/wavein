"use client";
import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ExecuteWrap from "./ExecuteWrap";
import StartStream from "./StartStream";
import { WaveInConfirmationData } from "@/types/types";


type WrapAndExecuteStreamParentProps = { 
step:number; 
setStep:React.Dispatch<React.SetStateAction<number>>; 
}

const WrapAndExecuteStreamParent = ({
    step, setStep, 
    dueDate,
    reason,
    payer,
    payee,
    expectedAmount,
    requestId,
    currencyAddress,
    expectedFlowRate
}: WrapAndExecuteStreamParentProps & WaveInConfirmationData) => {


  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex">
          {step === 0 ? "Wrap USDC" : "Confirm"}{" "}
          <span className="relative flex h-2 w-2 mt-1 ml-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
        </DialogTitle>
        <DialogDescription>
          {step === 0 && (
            <p className="text-sm text-gray-500">Wrap USDC to USDCx</p>
          )}
          {step === 1 && (
            <p className="text-sm text-gray-500">Confirm the transaction</p>
          )}
        </DialogDescription>
      </DialogHeader>
      {step === 0 && <ExecuteWrap setStep={setStep} expectedAmount={expectedAmount} />}
      {step === 1 && <StartStream setStep={setStep} expectedAmount={expectedAmount} payee={payee} expectedFlowRate={expectedFlowRate} />}
    </DialogContent>
  );
};

export default WrapAndExecuteStreamParent;
