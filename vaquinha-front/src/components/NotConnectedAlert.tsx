
import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';

const NotConnectedAlert = () => {
  const { select, wallets, connect } = useWallet();

  const connectWallet = async () => {
    if (wallets.length > 0) {
      await select(wallets[0].adapter.name);
      await connect();
    }
  };

  return (
    <Alert className="glass mt-8 border-blue-accent/20">
      <AlertTriangle className="h-5 w-5 text-blue-accent" />
      <AlertTitle className="text-lg font-semibold text-blue-accent">Not connected to blockchain</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-4">
          Connect your wallet to see and support fundraising campaigns on Vaquinha Web3.
        </p>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-accent" />
          <span className="text-sm text-muted-foreground">Secure and private connection</span>
        </div>
        <Button 
          onClick={connectWallet} 
          className="mt-4 bg-blue-accent hover:bg-blue-accent/80"
        >
          Connect Wallet
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default NotConnectedAlert;
