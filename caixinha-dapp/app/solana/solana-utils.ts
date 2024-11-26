import {
  clusterApiUrl,
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Cluster,
} from "@solana/web3.js";

export function generateSolanaWallet() {
  const keypair = new Keypair();
  return {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: keypair.secretKey.toString(),
  };
}

export async function aidrop(
  sols: number,
  publicKey: string,
  net: Cluster = "devnet"
) {
  try {
    const connection = new Connection(clusterApiUrl(net), "confirmed");
    const _publicKey = new PublicKey(publicKey);
    const airdropSignature = await connection.requestAirdrop(
      _publicKey,
      sols * LAMPORTS_PER_SOL
    );
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      signature: airdropSignature,
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
