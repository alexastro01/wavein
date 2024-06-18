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

export function InputWaveInDetails() {
  const [payeeIdentity, setPayeeIdentity] = React.useState("");
  const [payerIdentity, setPayerIdentity] = React.useState("");
  const [expectedAmount, setExpectedAmount] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [reason, setReason] = React.useState("");

  const handlePayeeIdentityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Payee Identity changed:", value);
    setPayeeIdentity(value);
  };

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
      payeeIdentity,
      payerIdentity,
      expectedAmount,
      dueDate,
      reason,
    });
    // Add your form submission logic here
  };

  return (
    <Card className="w-[350px]">
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
        <form onSubmit={handleSubmit as any }>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="payeeIdentity">
                Address to receive the funds to...
              </Label>
              <Input
                id="payeeIdentity"
                placeholder="Address to send the payment to"
                value={payeeIdentity}
                onChange={handlePayeeIdentityChange}
              />
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
            payeeIdentity={payeeIdentity}
            payerIdentity={payerIdentity}
            expectedAmount={expectedAmount}
            dueDate={dueDate}
            reason={reason}
         />
          </CardFooter>
      </CardContent>
    </Card>
  );
}
