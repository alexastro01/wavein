"use client";


import { ConfirmWaveInCard } from "@/components/ConfirmWaveInCard";
import { Navbar } from "@/components/Navbar";
import React from "react";



export default function Page({ params }: { params: { slug: string } }) {

    return( <div>
        <Navbar />
        <div className="flex justify-center items-center mt-8">
            <ConfirmWaveInCard />
        </div>

    </div>);
};


