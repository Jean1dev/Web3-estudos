//@ts-nocheck
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CaixinhaDapp } from "../target/types/caixinha_dapp";
import { expect } from "chai";

describe("caixinha-dapp", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace.CaixinhaDapp as Program<CaixinhaDapp>;

  it("Creates a new caixinha!", async () => {
    const [caixinhaPDA, _] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("CAIXINHA_DEMO"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    const txHash = await program.methods
      .createCaixinha(
        "Test Name",
        "Test Description",
        "646f538de5cd54cc6344ec69"
      )
      .accounts({
        caixinha: caixinhaPDA,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([provider.wallet.payer])
      .rpc();

    console.log("txHash", txHash);

    const caixinha = await program.account.caixinha.fetch(caixinhaPDA);
    expect(caixinha.name).to.eq("Test Name");
    expect(caixinha.desc).to.eq("Test Description");
    expect(caixinha.refId).to.eq("646f538de5cd54cc6344ec69");
    expect(caixinha.owner).to.eq(provider.wallet.publicKey);
    expect(caixinha.amount).to.eq(0);
    expect(caixinha.depositsCount).to.eq(0);
  });

  it("Deposits into a caixinha!", async () => {
    const [caixinhaPDA, _] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("CAIXINHA_DEMO"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    const txHash = await program.methods
      .deposit(new anchor.BN(100))
      .accounts({
        caixinha: caixinhaPDA,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([provider.wallet.payer])
      .rpc();

    console.log("txHash", txHash);

    const caixinha = await program.account.caixinha.fetch(caixinhaPDA);
    expect(caixinha.amount).to.eq(100);
    expect(caixinha.depositsCount).to.eq(1);
  });
});
