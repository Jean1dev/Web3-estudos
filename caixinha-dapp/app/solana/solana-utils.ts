import { Keypair } from "@solana/web3.js";

export function generateSolanaWallet() {
  const keypair = new Keypair();
  return {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: keypair.secretKey.toString(),
  };
}
