"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDemo } from "@/components/CalendarDemo";
import CreateRequestButton from "./CreateRequestButton";
import Link from "next/link";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";



export function InputWaveInDetails() {
  
  const {address} = useAccount()

  // const [payeeIdentity, setPayeeIdentity] = React.useState(address);
  const [payerIdentity, setPayerIdentity] = React.useState("");
  const [expectedAmount, setExpectedAmount] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [linkState, setLinkState] = React.useState("");
  const [copySuccess, setCopySuccess] = React.useState('');


  // const handlePayeeIdentityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   console.log("Payee Identity changed:", value);
  //   setPayeeIdentity(value);
  // };

  const handlePayerIdentityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Payer Identity changed:", value);
    setPayerIdentity(value);
  };

  const handleExpectedAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Expected Amount changed:", value);
    setExpectedAmount(value);
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Reason changed:", value);
    setReason(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log("Form submitted with state values:", {
      payerIdentity,
      expectedAmount,
      dueDate,
      reason,
    });
    // Add your form submission logic here
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkState)
      .then(() => setCopySuccess('Copied!'))
      .catch(err => setCopySuccess('Failed to copy!'));
  };

  return (
    <div className="grid">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>
            Create{" "}
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text font-bold0">
              WaveIn
            </span>
          </CardTitle>
          <CardDescription>Add wavein Details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit as any}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label >
                  Address to receive the funds
                </Label>
                  <ConnectButton />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="payerIdentity">
                  Address that will send the funds...
                </Label>
                <Input
                  id="payerIdentity"
                  placeholder="Address that will send the funds..."
                  value={payerIdentity}
                  onChange={handlePayerIdentityChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="reason">Reason of WaveIn</Label>
                <Input
                  id="reason"
                  placeholder="Work on my website"
                  value={reason}
                  onChange={handleReasonChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="Amount to send"
                  value={expectedAmount}
                  onChange={handleExpectedAmountChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Payment will be finished on date...</Label>
                <CalendarDemo setDueDate={setDueDate} />
              </div>

            </div>

          </form>
          <CardFooter className="flex justify-center">
            <CreateRequestButton
              payeeIdentity={address as string}
              payerIdentity={payerIdentity}
              expectedAmount={expectedAmount}
              dueDate={dueDate}
              reason={reason}
              expectedFlowRate="1"
              setLinkState={setLinkState}
              setIsConfirmed={setIsConfirmed}
            />
          </CardFooter>
        </CardContent>
      </Card>
      {
    isConfirmed && (
      <div className="max-w-[500px] border border-blue-400 rounded-lg p-4 flex items-center space-x-2 mt-4">
        <div className="flex-grow overflow-x-auto">
          <Link href={linkState} className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text font-bold max-w-full overflow-hidden whitespace-nowrap">
            {linkState}
          </Link>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          aria-label="Copy to clipboard"
        >
          <ClipboardCopyIcon className="h-5 w-5 text-blue-500" />
        </button>
        {copySuccess && <span className="text-green-500">{copySuccess}</span>}
      </div>
    )
      }
    </div>
  );
}
