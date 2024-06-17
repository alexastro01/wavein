import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Page() {
  return (
    <div>

 <Button>Click</Button>
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />

    </div>
    </div>
  );
}

export default Page;
