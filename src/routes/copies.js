import { Router } from 'express';
import CopyController from '../controllers/copy.controller';
import { multerUploads } from '../middleware/multer';
import { auth } from '../middleware/auth';

const router = new Router();

// @POST # /api/users/books/add
// @POST # /api/users/books/copypic

router.post('/add', auth, CopyController.addCopy);
router.post('/copypic', auth, multerUploads, CopyController.addCopyPic);

// @PUT # /api/users/books/:copyId/available

router.put('/:copyId/available', auth, CopyController.tagAvailable);

// @DELETE # /api/users/books/:copyId

router.delete('/:copyId', auth, CopyController.delCopy);


export default router;
