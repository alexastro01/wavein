import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "./dashboard/components/date-range-picker"
import { MainNav } from "./dashboard/components/main-nav"
import { Overview } from "./dashboard/components/overview"
import { RecentSales } from "./dashboard/components/recent-sales"
import { Search } from "./dashboard/components/search"
import { UserNav } from "./dashboard/components/user-nav"
import { IRequestDataWithEvents } from "@requestnetwork/request-client.js/dist/types"
import { useEffect } from "react"



export default function DashBoardComponent(data: any ) {
   
   useEffect(() => {
   console.log(data.data.data)
   }, [data])


  return (
    <>

      <div className="hidden flex-col md:flex">
        <div className="border-b">

        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
     
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
       
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 ">
                <Card>
                  <CardHeader className="flex flex-row items-center  space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Expected Amount
                    </CardTitle>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg> */}
                  </CardHeader>
                  <CardContent>
                    {/* //REQUEST EXPECTED AMOUNT TOTAL */}
                    <div className="text-2xl font-bold">${data.data.totalExpectedAmount}</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Waveins
                    </CardTitle>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg> */}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.data.data.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
      
         
    
              </div>
              <div className="w-full">

                <Card className="justify-items-center items-center  grid grid-cols-1">
                  <CardHeader>
                    <CardTitle>Recent WaveIns</CardTitle>
              
                  </CardHeader>
                  <CardContent>
                    {data ?  <RecentSales data={data.data.data as any} /> : <p>Loading..</p>} 
                   
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
