import { Router } from 'express';
import { generateNewWallet } from './new-wallet';

const router = Router();

router.post('/new-wallet', generateNewWallet);

export default router;