import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = new Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);

export default router;