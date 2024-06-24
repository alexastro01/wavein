"use client";


import { ConfirmWaveInCard } from "@/components/ConfirmWaveInCard";
import { Navbar } from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { RequestNetwork, Types } from "@requestnetwork/request-client.js";
import { WaveInConfirmationData } from "@/types/types";
import { request } from "http";


export default function Page({ params }: { params: { slug: string } }) {

    const [loading, setLoading] = useState(false);
    const [requestData, setRequestData] = useState<WaveInConfirmationData>()


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


         const requestDataReceived: WaveInConfirmationData = {
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
        <div className="flex justify-center items-center mt-8">
        <ConfirmWaveInCard
        dueDate={requestData?.dueDate}
        reason={requestData.reason}
        payer={requestData.payer}
        payee={requestData.payee}
        expectedAmount={requestData.expectedAmount}
        requestId={requestData.requestId}
        currencyAddress={requestData.currencyAddress}
        expectedFlowRate={requestData.expectedFlowRate}


        />
    </div>
        : 
        <div className="flex justify-center items-center mt-8">
            Loading...
        </div>
        }
        

    </div>
    );
};


