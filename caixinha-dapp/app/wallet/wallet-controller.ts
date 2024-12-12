import { Request, Response } from "express";
import { generateSolanaWallet } from "../solana/solana-utils";
import ApplicationState from "../state";

export function generateNewWallet(_: Request, res: Response) {
  try {
    const { publicKey, secretKey } = generateSolanaWallet();
    ApplicationState.addPublicKey(publicKey);

    res.status(200).json({ publicKey, secretKey });
  } catch (error) {
    console.error("Error generating wallet:", error);
    res.status(500).json({ error: "Failed to generate wallet" });
  }
}

export function getWalletsInMemo(_: Request, res: Response) {
  res.status(200).json({ wallets: ApplicationState.walletsList });
}
