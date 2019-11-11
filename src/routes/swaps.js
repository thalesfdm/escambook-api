import { Router } from 'express';
import SwapController from '../controllers/swap.controller';
import { auth } from '../middleware/auth';

const router = new Router();

// @GET # /api/swaps/pending
// @GET # /api/swaps/pending/mine

router.get('/pending', auth, SwapController.getPending);
router.get('/pending/mine', auth, SwapController.getPendingMine);

// @PUT # /api/swaps/:swapId/cancel

router.put('/:swapId/cancel', auth, SwapController.swapCancel);

// @POST # /api/swaps/start
// @POST # /api/swaps/:swapId/accept

router.post('/start', auth, SwapController.startSwap);
router.post('/:swapId/accept', auth, SwapController.swapAccept);

export default router;