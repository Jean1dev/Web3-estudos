import { Request, Response } from "express";
import { aidrop } from "../solana/solana-utils";

export async function requestAirDrop(req: Request, res: Response) {
    const sols = req.body?.sols || 1;
    const publicKey = req.body?.publicKey || "6VSpmMpW7uyVmmpvGyEAryNtf2H82azd5CfvnyA6fZ1k";
    const net = req.body?.net || "devnet";

    try {
        await aidrop(sols, publicKey, net);
        return res.status(200).json({ message: `Airdrop of ${sols} SOL to ${publicKey} successful` });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}