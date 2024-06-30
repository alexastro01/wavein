import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import RecentSaleComponent from "./RecentSaleComponent"
import { IRequestDataWithEvents } from "@requestnetwork/request-client.js/dist/types"
import { useEffect } from "react"

export function RecentSales({data}: any) {
  useEffect(() => {
    //DATA IN CHILD COMP
   console.log(data)
  }, [data])
  return (
    <div className="space-y-8 w-full justify-items-center items-center mx-auto">

    
  
       {
        data ? data.map((request: IRequestDataWithEvents) => (
          <RecentSaleComponent
            key={request.requestId}
            payer={request.payer?.value as string}
            reason={request.contentData.reason}
            expectedAmount={request.expectedAmount as string}
            requestId={request.requestId}
          />
        )) : (
          <div className="flex justify-center items-center">
           <p>Loading..</p>
          </div>
        )
       }

    </div>
  )
}
