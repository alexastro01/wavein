// EthereumAddress.tsx
import React from 'react';

interface EthereumAddressProps {
  address: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small: 'text-xs',
  medium: 'text-base',
  large: "text-lg",
  xl: 'text-xl',
};

const Address: React.FC<EthereumAddressProps> = ({ address, size="large" }) => {
  return (
    <div className={` text-black ${sizeClasses[size]} font-semibold`}>
      <p className="break-all">{address}</p>
    </div>
  );
};

export default Address;
