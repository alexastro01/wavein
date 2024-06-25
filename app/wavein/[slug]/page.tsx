"use client";

import FlowingBalance from "@/components/FlowingBalance";
import { Navbar } from "@/components/Navbar";
import WaveInView from "@/components/WaveInView";
import { WaveInData } from "@/types/types";
import { RequestNetwork } from "@requestnetwork/request-client.js";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {


  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState<WaveInData>()


  const requestClient = new RequestNetwork({
      nodeConnectionConfig: { 
        baseURL: "https://sepolia.gateway.request.network/",
      },
    });

  useEffect(() => {
   async function getRequestData() {
      
      setLoading(true)
      try{
      const request = await requestClient.fromRequestId(
          params.slug,
        );
        const requestData = request.getData();

       console.log(requestData)


       const requestDataReceived: WaveInData = {
         dueDate: requestData.contentData.dueDate,
         reason: requestData.contentData.reason,
         payee: requestData.payee?.value as string,
         payer: requestData.payer?.value as string,
         expectedAmount: requestData.expectedAmount,
         requestId: requestData.requestId,
         currencyAddress: requestData.currencyInfo.value,
         expectedFlowRate: requestData.extensionsData[0].parameters.expectedFlowRate
       }

       console.log(requestDataReceived)

       setRequestData(requestDataReceived)
      } catch (error) {
          console.log(error)
      } finally {
          setLoading(false)
      }
   }
   getRequestData();
  }, [])

  return (
    <div>
      <Navbar />
      {requestData ?
        <WaveInView 
        dueDate={requestData?.dueDate}
        reason={requestData?.reason}
        payer={requestData?.payer}
        payee={requestData?.payee}
        expectedAmount={requestData?.expectedAmount}
        requestId={requestData?.requestId}
        currencyAddress={requestData?.currencyAddress}
        expectedFlowRate={requestData?.expectedFlowRate}
      /> 
      : loading ? <div>Loading...</div> : <div>Request not found</div>  
    }

    </div>
  );
};


