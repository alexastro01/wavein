import React from 'react';
import FlowingBalance from './FlowingBalance';
import Address from './Address';
import { AddressStreamingCard } from './AddressStreamingCard';

const WaveInView = () => {
  return (
    <div className="flex flex-col items-center p-4 justify-items-center mt-8">
      <div className="w-[165px] mb-4">
        <FlowingBalance
          startingBalance={BigInt("1000000000000000000")}
          startingBalanceDate={new Date('2024-01-01T00:00:00.000Z')}
          flowRate={BigInt("1000000000000000")}
        />
      </div>
      <div className="flex items-center space-x-4">
        <AddressStreamingCard address='0x909957dcc1B114Fe262F4779e6aeD4d034D96B0f' receiver={false} />
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping delay-75"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping delay-150"></div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping delay-300"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-ping delay-500"></div>
        <div className="w-5 h-5 rounded-full bg-blue-500 animate-ping delay-700"></div>
        <div className="w-6 h-6 rounded-full bg-blue-500 animate-ping delay-1000  "></div>
        <AddressStreamingCard address='0x909957dcc1B114Fe262F4779e6aeD4d034D96B0f' receiver={true} />

      </div>
    </div>
  );
};

export default WaveInView;