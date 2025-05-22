import {
    clusterApiUrl,
    Connection,
    PublicKey
} from '@solana/web3.js';
import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import idl, { VaquinhaDaap } from './idl';

const PROGRAM_ID = new PublicKey(idl.metadata.address);

export const getProvider = (wallet, rpcUrl?: string) => {
    const connectionUrl = rpcUrl || clusterApiUrl('devnet');
    const connection = new Connection(connectionUrl);

    return new AnchorProvider(
        connection,
        wallet,
        {
            preflightCommitment: 'processed'
        }
    )
}

export const anchorProgram = (wallet, rpcUrl?: string): Program<VaquinhaDaap> => {
    const provider = getProvider(wallet, rpcUrl)

    //@ts-ignore
    return new Program(
        idl,
        PROGRAM_ID,
        provider
    )
}