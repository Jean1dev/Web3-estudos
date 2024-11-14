import { Request, Response } from 'express';
import { generateSolanaWallet } from '../solana/solana-utils';

export function generateNewWallet(_: Request, res: Response) {
    try {
        const { publicKey, secretKey } = generateSolanaWallet();
        res.status(200).json({ publicKey, secretKey });
    } catch (error) {
        console.error('Error generating wallet:', error);
        res.status(500).json({ error: 'Failed to generate wallet' });
    }
}
