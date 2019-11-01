import { Router } from 'express';
import BookController from '../controllers/book.controller';
import { multerUploads } from '../middleware/multer';
import { auth } from '../middleware/auth';

const router = new Router();

// @GET /api/books/
// @GET /api/books/:bookId
// @GET /api/books/:title/titulo
// @GET /api/books/:isbn/isbn
// @GET /api/books/:author/author

router.get('/', BookController.getAll);
router.get('/:bookId', BookController.getById);
router.get('/:title/titulo', BookController.getByTitle);
router.get('/:isbn/isbn', BookController.getByIsbn);
router.get('/:author/author', BookController.getByAuthor);

// @POST # /api/books/coverpic
// @POST # /api/books/register

router.post('/coverpic', auth, multerUploads, BookController.addCoverPic);
router.post('/register', auth, BookController.registerBook);

export default router;