import { CreateRequest } from '@/components/CreateRequest';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Page() {
  return (
    <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />

    </div>
    <div>
      <CreateRequest />
    </div>
    </div>
  );
}

export default Page;
