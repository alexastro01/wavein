import * as React from "react";
import { ClipboardCopyIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { WaveInData } from "@/types/types";
import FlowingBalance from "./FlowingBalance";
import { useAccount } from "wagmi";
import UnwrapUSDCX from "./UnwrapUSDCX";
import DownloadInvoicePdf from "./DownloadInvoicePdf";
import { parseEther } from "viem";

export function WaveInDetailsDrawer({
  dueDate,
  expectedAmount,
  requestId,
  currencyAddress,
  expectedFlowRate,
  reason,
  payee,
  payer,
  currentBalance

}: WaveInData & {
  balance: bigint;

}) {
  const { address } = useAccount();
  const [copySuccess, setCopySuccess] = React.useState("");

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(requestId)
      .then(() => setCopySuccess("Copied!"))
      .catch((err) => setCopySuccess("Failed to copy!"));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerTitle>WaveIn Details</DrawerTitle>
          <DrawerDescription className="underline">{reason}</DrawerDescription>
          <div>
            <p>
              <strong>Due Date:</strong> {dueDate}
            </p>
            <p>
              <strong>Expected Amount:</strong> {expectedAmount} USDC
            </p>
            <div>
              <strong>Receiver's Balance:</strong>
              <div className="flex justify-center mt-2 w-[100px] m-auto">
           <FlowingBalance
                  startingBalance={parseEther(currentBalance.toString())}
                  startingBalanceDate={new Date()}
                  flowRate={BigInt(expectedFlowRate)}
                /> 
              
              </div>
            </div>
            <p>
              <strong>Download PDF</strong>
            </p>

            {/* COPY TO CLIPBOARD COMPONENT */}
            {/* INVOICE DOWNLOAD PDF */}

            <DownloadInvoicePdf
            dueDate={dueDate}
            expectedAmount={Number(expectedAmount)}
            requestId={requestId}
    
            reason={reason}
            payee={payee}
            payer={payer}


            />
          </div>
          <DrawerFooter>
            {address === payee && (
              <UnwrapUSDCX
                requestId={requestId}
                usdcxBalance={currentBalance}

              />
            )}

            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
