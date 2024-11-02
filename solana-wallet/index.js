const {
    Connection,
    Keypair,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
    
} = require('@solana/web3.js')

const keypair = new Keypair()
const publicKey = keypair.publicKey;
const privateKey = keypair.secretKey;

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'));
        const balance = await connection.getBalance(publicKey);
        console.log(`Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
        console.error("Error getting wallet balance:", error);
    }
};

const airdropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet', 'confirmed'));
        const airdropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airdropSignature);
        console.log("Airdrop successful!");
    } catch (error) {
        console.error("Error during airdrop:", error);
    }
};

async function main() {
    await getWalletBalance()
    await airdropSol()
    await getWalletBalance()
}

main()