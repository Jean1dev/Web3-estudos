// No imports needed: web3, anchor, pg and more are globally available

describe("Test", () => {
  it("should be create a new vaquinha", async () => {
    const nameVaquinha = "Vaquinha test automatizado";
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
        systemProgram: pg.PROGRAM_ID,
      })
      .signers([pg.wallet.keypair])
      .rpc();

    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    await pg.connection.confirmTransaction(txHash);

    const vaquinhaAccount = await pg.program.account.vaquinha.fetch(
      newVaquinhaKeypar.publicKey
    );

    console.log("On-chain data is:", vaquinhaAccount.name);

    assert(vaquinhaAccount.name === nameVaquinha);
    assert(vaquinhaAccount.description === description);
  });
});
