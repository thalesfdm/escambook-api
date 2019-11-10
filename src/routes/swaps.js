import { Router } from 'express';
import SwapController from '../controllers/swap.controller';
import { auth } from '../middleware/auth';

const router = new Router();

// @GET # /api/swaps/pending
// @GET # /api/swaps/pending/mine

router.get('/pending', auth, SwapController.getPending);
router.get('/pending/mine', auth, SwapController.getPendingMine);

// @POST # /api/swaps/start

router.post('/start', auth, SwapController.startSwap);

export default router;