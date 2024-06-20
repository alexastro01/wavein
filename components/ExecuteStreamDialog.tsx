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

export function ExecuteStreamDialog() {
  const [step, setStep] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Proceed</Button>
      </DialogTrigger>
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
              <p className="text-sm text-gray-500">
               Wrap USDC to USDCx
              </p>
            )}
             {step === 1 && (
              <p className="text-sm text-gray-500">
                Confirm the transaction
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        {step === 0 && <ExecuteWrap setStep={setStep} />}
        {step === 1 && <StartStream setStep={setStep} />}
      </DialogContent>
    </Dialog>
  );
}
