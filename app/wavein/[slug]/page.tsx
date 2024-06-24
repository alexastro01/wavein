import FlowingBalance from "@/components/FlowingBalance";
import { Navbar } from "@/components/Navbar";
import WaveInView from "@/components/WaveInView";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Navbar />
    <WaveInView />
    </div>
  );
};


