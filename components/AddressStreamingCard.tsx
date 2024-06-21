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

type CardWithFormProps = {
    receiver: boolean,
    address: string
}

export function AddressStreamingCard({
    receiver,
    address
}: CardWithFormProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
            {receiver ? "Receiver" : "Sender"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Address address={address} />   
      </CardContent>

    </Card>
  )
}