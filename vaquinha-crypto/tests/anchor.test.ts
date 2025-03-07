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
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([newVaquinhaKeypar])
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

  it("It should not be possible to make a donation because the value is less than zero", async () => {
    const existsVaquinhaPubKey = "6nmKJQRPvt1DLFpJQ283v81GBUAuS5RHuQAd1i3YCNSR";

    try {
      await pg.program.methods
        .donate(new BN(0))
        .accounts({
          vaquinha: existsVaquinhaPubKey,
          user: pg.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();
    } catch (err) {
      console.log("Erro capturado:", err.toString());

      assert(err.toString().includes("AmountInvalid."));
    }
  });

  it("must make a donation", async () => {
    const existsVaquinhaPubKey = "6nmKJQRPvt1DLFpJQ283v81GBUAuS5RHuQAd1i3YCNSR";

    const vaquinhaAccount = await pg.program.account.vaquinha.fetch(
      existsVaquinhaPubKey
    );

    const currentAmmount = new BN(vaquinhaAccount.amountDonated);

    await pg.program.methods
      .donate(new BN(1))
      .accounts({
        vaquinha: existsVaquinhaPubKey,
        user: pg.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    const expectedAmount = currentAmmount.add(new BN(1));

    const vaquinhaAccountUpdated = await pg.program.account.vaquinha.fetch(
      existsVaquinhaPubKey
    );

    assert(new BN(vaquinhaAccountUpdated.amountDonated).eq(expectedAmount));
  });
});
