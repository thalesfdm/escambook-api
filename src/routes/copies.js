import { Router } from 'express';
import CopyController from '../controllers/copy.controller';
import { auth } from '../middleware/auth';

const router = new Router();

// @POST # /api/users/books/add

router.post('/add', auth, CopyController.addCopy);

// @DELETE # /api/users/books/:copyId

router.delete('/:copyId', auth, CopyController.delCopy);

// @PUT # /api/users/books/:copyId/tag

router.put('/:copyId/tag', auth, CopyController.tagCopy);

export default router;