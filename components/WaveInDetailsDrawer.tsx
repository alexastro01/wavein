import * as React from "react"
import { ClipboardCopyIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons"


import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { WaveInData } from "@/types/types"
import FlowingBalance from "./FlowingBalance"
import { useAccount } from "wagmi"



export function WaveInDetailsDrawer({
    dueDate,
    expectedAmount,
    requestId,
    currencyAddress,
    expectedFlowRate,
    reason,
    payee,
    payer,
    balance
}: WaveInData & { balance: bigint}) {


   const {address} = useAccount()
   const [copySuccess, setCopySuccess] = React.useState('');

   const copyToClipboard = () => {
    navigator.clipboard.writeText(requestId)
      .then(() => setCopySuccess('Copied!'))
      .catch(err => setCopySuccess('Failed to copy!'));
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
                startingBalance={balance}
                startingBalanceDate={new Date()}
                flowRate={BigInt(expectedFlowRate)}
              />
            </div>
          </div>
          <p>
            <strong>Request ID:</strong> 
          </p>

          {/* COPY TO CLIPBOARD COMPONENT */}
          <div className="max-w-[500px]  border-blue-400 rounded-lg p-2 flex items-center space-x-2 mt-0">
        <div className="flex-grow overflow-x-auto">
          <p className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text font-bold max-w-full overflow-hidden whitespace-nowrap">
            {requestId}
          </p>
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
         
    
           </div>
          <DrawerFooter>
            {address === payee &&  <Button>Unwrap USDCX to USDC</Button>}
     
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
