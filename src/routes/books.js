import { Router } from 'express';
import BookController from '../controllers/book.controller';
import { multerUploads } from '../middleware/multer';
import { auth } from '../middleware/auth';

const router = new Router();

// @GET /api/books/
// @GET /api/books/:bookId
// @GET /api/books/search/author/:author
// @GET /api/books/search/isbn/:isbn
// @GET /api/books/search/title/:title

router.get('/', BookController.getAll);
router.get('/:bookId', BookController.getById);
router.get('/search/author/:author', BookController.getByAuthor);
router.get('/search/isbn/:isbn', BookController.getByIsbn);
router.get('/search/title/:title', BookController.getByTitle);

// @POST # /api/books/coverpic
// @POST # /api/books/register

router.post('/coverpic', auth, multerUploads, BookController.addCoverPic);
router.post('/register', auth, BookController.registerBook);

export default router;
