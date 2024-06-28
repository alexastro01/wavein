
import React, { useEffect } from "react";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { usdcAbi } from "@/abi/USDC";
import { parseEther } from "viem";
import { USDC_CONTRACT_ADDRESS_SEPOLIA, USDCX_CONTRACT_ADDRESS_SEPOLIA } from "@/utils/constants";
import { writeContract } from "viem/actions";

type ApproveProps = {
    expectedAmount: string | number
}

const Approve = ({expectedAmount}: ApproveProps) => {
    const { data: hash, writeContract, error, isSuccess, isPending } = useWriteContract();

    const { isLoading, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })



        useEffect(() => {
          console.log(isLoading)
          console.log(isConfirmed);
        }, [isLoading, isConfirmed])

        
    async function ApproveTokens() {



        writeContract({
            address: USDC_CONTRACT_ADDRESS_SEPOLIA,
            abi: usdcAbi,
            functionName: "approve",
            //msg.sender
            args: [USDCX_CONTRACT_ADDRESS_SEPOLIA, parseEther(expectedAmount.toString())]
        });
    }

    return (
        <Button className="w-full" onClick={ApproveTokens} disabled={isLoading}>{isLoading ?
            "Loading..."
            : "Approve"}</Button>
    )
}

export default Approve