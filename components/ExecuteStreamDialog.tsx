import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import ExecuteWrap from "./ExecuteWrap";
import StartStream from "./StartStream";
import StreamSuccess from "./StreamSuccess";
import WrapAndExecuteStreamParent from "./WrapAndExecuteStreamParent";
import { WaveInConfirmationData } from "@/types/types";

export function ExecuteStreamDialog({
  dueDate,
  reason,
  payer,
  payee,
  expectedAmount,
  requestId,
  currencyAddress
}: WaveInConfirmationData) {
  const [step, setStep] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Proceed</Button>
      </DialogTrigger>
      {step === 2 ? <StreamSuccess /> : <WrapAndExecuteStreamParent step={step} setStep={setStep}
        dueDate={dueDate}
        reason={reason}
        payer={payer}
        payee={payee}
        expectedAmount={expectedAmount}
        requestId={requestId}
        currencyAddress={currencyAddress}
      />}
    </Dialog>
  );
}
