

import React from 'react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import Link from 'next/link'
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { Button } from './ui/button';

type StreamSuccessType ={
  requestId: string
}

function StreamSuccess({
  requestId
}: StreamSuccessType) {







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
  
          <Link href={`http://localhost:3000/stream/${requestId}`} className='flex justify-center mt-4 py-8'>
          <Button  className=" font-bold text-xl " size={"lg"}>
             Go To Stream
            </Button>{" "}
          </Link>
        </DialogHeader>
      </DialogContent>
          
    </div>
  )
}


export default StreamSuccess