// Client
console.log("My address:", pg.wallet.publicKey.toString());
const balance = await pg.connection.getBalance(pg.wallet.publicKey);
console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

try {
  const vaquinhaAccount = await pg.program.account.vaquinha.fetch(
    "FiMGZCSwPeRPbKYCoetKskmB1noKDyvppPLq7VovSAZW"
  );
  console.log("A conta já existe:", vaquinhaAccount);
} catch (e) {
  console.log("A conta não existe ainda, pode ser criada.");
}

const nameVaquinha = "Vaquinha client automatizado";
const description = "Uma description qualquer";
const newVaquinhaKeypar = new web3.Keypair();

console.log("Criando a vaquinha...");
console.log("Vaquinha PublicKey:", newVaquinhaKeypar.publicKey.toBase58());
console.log("Criador PublicKey:", pg.wallet.publicKey.toBase58());
console.log("Signers:", pg.wallet.keypair ? "OK" : "MISSING");

const txHash = await pg.program.methods
  .createVaquinha(nameVaquinha, description)
  .accounts({
    vaquinha: newVaquinhaKeypar.publicKey,
    creator: pg.wallet.publicKey,
    systemProgram: web3.SystemProgram.programId,
  })
  .signers([newVaquinhaKeypar])
  .rpc();
