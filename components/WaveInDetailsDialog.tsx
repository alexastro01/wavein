import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { WaveInData } from "@/types/types"
import FlowingBalance from "./FlowingBalance"


export function WaveInDetailsDialog({
    dueDate,
    expectedAmount,
    requestId,
    currencyAddress,
    expectedFlowRate
}: WaveInData) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Wavein Details</DialogTitle>
      </DialogHeader>
          <p>
            <strong>Due Date:</strong> {dueDate}
          </p>
          <p>
            <strong>Expected Amount:</strong> {expectedAmount} USDC at {currencyAddress}
          </p>
          <div>
            <strong>Receiver's Balance:</strong>
            <div className="flex justify-center mt-2">
              <FlowingBalance
                startingBalance={BigInt("1000000000000000000")}
                startingBalanceDate={new Date()}
                flowRate={BigInt(expectedFlowRate)}
              />
            </div>
          </div>
          <p>
            <strong>Request ID:</strong> {requestId}
          </p>
    
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}