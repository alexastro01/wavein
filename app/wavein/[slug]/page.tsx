"use client";

import FlowingBalance from "@/components/FlowingBalance";
import { Navbar } from "@/components/Navbar";
import WaveInView from "@/components/WaveInView";
import { WaveInData } from "@/types/types";
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { IRequestDataWithEvents } from "@requestnetwork/request-client.js/dist/types";
import React, { useEffect, useState } from "react";
import { parseEther } from "viem";

export default function Page({ params }: { params: { slug: string } }) {


  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState<WaveInData>()


  const requestClient = new RequestNetwork({
      nodeConnectionConfig: { 
        baseURL: "https://sepolia.gateway.request.network/",
      },
    });

    async function getCurrentBalanceFromInvoice(requestData: IRequestDataWithEvents) {
      // Find the declareSentPayment action
      const declareSentPayment = requestData.extensionsData.find(
        (data) => data.action === "declareSentPayment"
      );
    
      if (!declareSentPayment) {
        throw new Error("No declareSentPayment action found in extensionsData");
      }
    
      // Extract and convert the note date to a Unix timestamp
      const noteDate = new Date(declareSentPayment.parameters.note);
      const noteTimestamp = Math.floor(noteDate.getTime() / 1000); // Convert to Unix timestamp
    
      // Retrieve the expectedFlowRate from the extensions
      const expectedFlowRate = parseInt(requestData.extensions["pn-erc777-stream"].values.expectedFlowRate, 10);
    
      // Calculate the current time and the duration in seconds since the note date
      const currentTime = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
      const durationInSeconds = currentTime - noteTimestamp;
    
      // Calculate the current balance based on the expectedFlowRate and duration
      const currentBalance = expectedFlowRate * durationInSeconds;
    
      // Find all declareReceivedPayment actions and sum their amounts
      const receivedPayments = requestData.extensionsData.filter(
        (data) => data.action === "declareReceivedPayment"
      );

      console.log(receivedPayments)
    
      const receivedAmountSum = receivedPayments.reduce((sum, payment) => {
        return sum + parseInt(payment.parameters.amount, 10);
      }, 0);

      console.log(receivedAmountSum)

      console.log('-----------------CURRENT BALANCE------------------');
      console.log(currentBalance / 1e18)
      // Subtract the sum of received amounts from the current balance

      const currentBalanceNumber = Number(currentBalance / 1e18);
      const adjustedBalance = currentBalanceNumber - receivedAmountSum;
      console.log('-----------------ADJUSTED BALANCE------------------');
      console.log(adjustedBalance)
    
      // Convert the adjusted balance to ether and log it
      const adjustedBalanceInEther = adjustedBalance;

      console.log(adjustedBalanceInEther);
    
      return adjustedBalanceInEther;
    }
    
    

  useEffect(() => {
   async function getRequestData() {
      
      setLoading(true)
      try{
      const request = await requestClient.fromRequestId(
          params.slug,
        );
        const requestData = request.getData();

       console.log(requestData)

       //FROM INITIALIZED STREAMING DECLARED
       //ALSO HANDLE DECIMALS
     const currentBalance = await getCurrentBalanceFromInvoice(requestData)

       const requestDataReceived: WaveInData = {
         dueDate: requestData.contentData.dueDate,
         reason: requestData.contentData.reason,
         payee: requestData.payee?.value as string,
         payer: requestData.payer?.value as string,
         expectedAmount: requestData.expectedAmount,
         requestId: requestData.requestId,
         currencyAddress: requestData.currencyInfo.value,
         expectedFlowRate: requestData.extensionsData[0].parameters.expectedFlowRate,
         currentBalance: currentBalance
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
        currentBalance={requestData?.currentBalance}
        
      /> 
      : loading ? <div>Loading...</div> : <div>Request not found</div>  
    }

    </div>
  );
};


