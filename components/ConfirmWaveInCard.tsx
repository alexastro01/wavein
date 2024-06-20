import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Address from "./Address"
import { ExecuteStreamDialog } from "./ExecuteStreamDialog"
 
export function ConfirmWaveInCard() {

   const labelClassName ="text-sm font-semibold text-gray-500"
   const mainTextClassName = "text-lg font-semibold text-gray-800"

  return (
    <Card className="w-[350px] p-4">
      <CardHeader>
        <CardTitle>WaveIn Request</CardTitle>
        <CardDescription>Please verify the details of this wavein before proceeding</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-2">
       <p className={labelClassName}>Receiver</p>
       <Address address={"0x909957dcc1B114Fe262F4779e6aeD4d034D96B0f"} size="large" />
       <p className={labelClassName}>Amount</p>
       <p className={mainTextClassName}>500 USDC</p>
       <p className={labelClassName}>Reason</p>
       <p className={mainTextClassName}>Contract work</p>
       <p className={labelClassName}>Due Date</p>
       <p className={mainTextClassName}>2024-12-12</p>
       </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
       
        <ExecuteStreamDialog />
      </CardFooter>
    </Card>
  )
}