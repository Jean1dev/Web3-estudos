import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import React, { useMemo } from 'react';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SafePalWalletAdapter,
    LedgerWalletAdapter,
    MathWalletAdapter,
    SolongWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { clusterApiUrl } from '@solana/web3.js';

type Props = { children: React.ReactNode };

export const WalletContextProvider: React.FC<Props> = ({ children }: Props) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new MathWalletAdapter(),
        new SolflareWalletAdapter(),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new SolongWalletAdapter(),
        new SafePalWalletAdapter(),
    ], [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}