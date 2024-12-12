import { Router } from "express";
import { generateNewWallet, getWalletsInMemo } from "./wallet-controller";

const router = Router();

router.post("/new-wallet", generateNewWallet);

router.get("/in-memo", getWalletsInMemo);

export default router;
