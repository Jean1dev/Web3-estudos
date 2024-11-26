import { Router } from "express";
import { requestAirDrop } from "./fn";

const router = Router();
//@ts-ignore
router.post("/airdrop", requestAirDrop);

export default router;


