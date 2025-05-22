import { anchorProgram } from "@/anchor/anchor-provider";
import { BN } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export const rpcDonate = async (
    wallet: AnchorWallet,
    vaquinhaId: string,
    amount: number 
) => {
    const program = anchorProgram(wallet);

    try {
        const amountBN = new BN(amount);
        await program.methods.donate(amountBN)
            .accounts({
                vaquinha: vaquinhaId,
                user: wallet.publicKey
            })
            .rpc();

        return {
            error: false
        }
        
    } catch (error) {
        console.error(error);
        return {
            error: true
        }
    }
}