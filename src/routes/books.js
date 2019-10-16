import { Router } from 'express';
import BookController from '../controllers/book.controller';

const router = new Router();

// @GET /api/books/
// @GET /api/books/:bookId

router.get('/', BookController.getAll);
router.get('/:bookId', BookController.getById);

//@POST /api/books/register

router.post('/register', BookController.registerBook);

export default router;
