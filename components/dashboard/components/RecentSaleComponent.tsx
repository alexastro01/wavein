import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type RecentSaleComponentProps = {
  payer: string,
  reason: string,
  expectedAmount: string,
  requestId: string
}

const RecentSaleComponent = ({
  payer,
  reason,
  expectedAmount,
  requestId
}: RecentSaleComponentProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>0x</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 items-center justify-between">
        <div className="ml-4 space-y-1 min-w-[60px]">
          <p className="text-sm font-medium leading-none">{payer.slice(0, 4)}</p>
          <p className="text-sm text-muted-foreground truncate" title={reason}>
            {reason.length > 15 ? `${reason.slice(0, 15)}...` : reason}
          </p>
        </div>
        <div className="ml-auto font-medium min-w-[50px] text-right">{`$${expectedAmount}`}</div>
        <Link href={`/wavein/${requestId}`}>
          <Button className="ml-4" variant="outline">Go to stream</Button>
        </Link>
      </div>
    </div>
  )
}

export default RecentSaleComponent
