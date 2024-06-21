import FlowingBalance from '@/components/FlowingBalance'
import { Navbar } from '@/components/Navbar'
import React from 'react'

const Wavein = () => {
  return (
    <div>
        <Navbar />
        {/* //starting balance = current balanceOf
        //Starting balanceDate = Date.now()
        //flowrate = get flow rate from contract */}


        {/* //New component with parameters : 
        //address sender 
        //address receiver
        //<FlowingBalance /> */}

        
        <FlowingBalance startingBalance={BigInt("1000000000000000000")} startingBalanceDate={new Date('2024-01-01T00:00:00.000Z')} flowRate={BigInt("1000000000000000")} />
        
    </div>
  )
}

export default Wavein