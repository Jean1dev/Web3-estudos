import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CaixinhaDapp } from "../target/types/caixinha_dapp";
import { expect } from "chai";

describe("nft tests", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace.CaixinhaDapp as Program<CaixinhaDapp>;

  it("initialize nft", async () => {
    const newAccountKp = new web3.Keypair();

    const txHash = await pg.program.methods
      .createNewNft("nft criado no test", "img", 1.2)
      .accounts({
        nft: newAccountKp.publicKey,
        authority: pg.wallet.keypair,
        systemProgram: pg.PROGRAM_ID,
      })
      .signers([pg.wallet.keypair])
      .rpc();

    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    // Confirm transaction
    await pg.connection.confirmTransaction(txHash);

    // Fetch the created account
    const newAccount = await pg.program.account.myAchievement.fetch(
      newAccountKp.publicKey
    );

    console.log("On-chain data is:", newAccount);
  });
});
