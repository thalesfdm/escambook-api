import { Router } from 'express';
import BookController from '../controllers/book.controller';

const router = new Router();

router.post('/register', BookController.registerBook);

export default router;
