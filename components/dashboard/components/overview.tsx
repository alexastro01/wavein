"use client"

import FlowingBalance from "@/components/FlowingBalance"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"



export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <div className="text-2xl">
              <FlowingBalance
                startingBalance={BigInt("1000000000000000000")}
                startingBalanceDate={new Date()}
                flowRate={BigInt("100000000000")}
              />
              </div>
    </ResponsiveContainer>
  )
}
