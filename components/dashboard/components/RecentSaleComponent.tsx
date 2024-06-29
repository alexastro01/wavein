
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'

const RecentSaleComponent = () => {
  return (
    <div className="flex items-center space-x-5">
    <Avatar className="h-9 w-9">
      <AvatarImage src="/avatars/01.png" alt="Avatar" />
      <AvatarFallback>0x</AvatarFallback>
    </Avatar>
    <div className="ml-4 space-y-1">
      <p className="text-sm font-medium leading-none">0x90</p>
      <p className="text-sm text-muted-foreground">
        Contract work
      </p>
    </div>
    <div className="ml-auto font-medium">+$1,999.00</div>
    <Button className="ml-4" variant="outline">Go to stream</Button>
  </div>
  )
}

export default RecentSaleComponent