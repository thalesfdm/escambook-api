import { Router } from 'express';
import BookController from '../controllers/book.controller';
import { multerUploads } from '../middleware/multer';
import { auth } from '../middleware/auth';

const router = new Router();

// @GET /api/books/
// @GET /api/books/:bookId

router.get('/', BookController.getAll);
router.get('/:bookId', BookController.getById);

// @POST # /api/books/coverpic
// @POST # /api/books/register

router.post('/coverpic', auth, multerUploads, BookController.addCoverPic);
router.post('/register', auth, BookController.registerBook);

export default router;