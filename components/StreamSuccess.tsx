import React from 'react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import Link from 'next/link'

function StreamSuccess() {
  return (
    <div>
   <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex">
            Stream Started{""}
            <span className="relative flex h-2 w-2 mt-1 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </DialogTitle>
          <DialogDescription>
           Successfully started the stream
          </DialogDescription>
          <p className="text-xl font-semibold">
          You can view the stream here : 
          </p>
          <Link href="https://flowscan.org/stream/0x404CE8cb8cEC051d2Ef416D97E8d72D466Cb55dE">
          <span className="inline bg-gradient-to-r from-[#54d6fa] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text font-bold text-xl underline">
             https://wavein.io/stream/streamid
            </span>{" "}
          </Link>
        </DialogHeader>
      </DialogContent>
          
    </div>
  )
}

export default StreamSuccess