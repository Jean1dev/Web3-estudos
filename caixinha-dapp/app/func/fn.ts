import { Request, Response } from "express";
import { aidrop } from "../solana/solana-utils";
import AppState from "../state";

export async function requestAirDrop(req: Request, res: Response) {
  const sols = req.body?.sols || 1;
  const publicKey =
    req.body?.pubkey || "EFboku6ECMdG95kPi4iXwLsS57sqiGDoMk6yynN915js";
  const net = req.body?.clusterNet || "devnet";

  AppState.addPublicKey(publicKey);

  try {
    await aidrop(sols, publicKey, net);
    return res
      .status(200)
      .json({ message: `Airdrop of ${sols} SOL to ${publicKey} successful` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
