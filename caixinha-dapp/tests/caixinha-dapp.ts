import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CaixinhaDapp } from "../target/types/caixinha_dapp";
import { expect } from "chai";

describe("caixinha-dapp", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace.CaixinhaDapp as Program<CaixinhaDapp>;
  const caixinhaKeyPair = anchor.web3.Keypair.generate();

  it("Creates a new caixinha!", async () => {
    const txHash = await program.methods.createCaixinha(
      "Test Name",
      "Test Description",
      "646f538de5cd54cc6344ec69"
    )
    .accounts({
      //@ts-ignore
      caixinha: caixinhaKeyPair.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([caixinhaKeyPair])
    .rpc();

    console.log("txHash", txHash);

    const caixinha = await program.account.caixinha.fetch(caixinhaKeyPair.publicKey);
    expect(caixinha.name).to.eq("Test Name");
  });
});
