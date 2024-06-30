"use client";
import { useEffect, useState } from "react";
import DashBoardComponent from "../DashboardComponent";
import { Metadata } from "next";
import { useAccount } from "wagmi";

export default function DashboardPage() {
  const [data, setData] = useState<any>();
  const { address } = useAccount();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/getFreelanceInvoices?address=${address}`
      );
      const data = await response.json();
      console.log(data);
      setData(data);
    }
    if (address) {
      fetchData();
    }
  }, [address]);

  return (
    <>{data ? <DashBoardComponent data={data as any} /> : <div>Loading...</div>}</>
  );
}
