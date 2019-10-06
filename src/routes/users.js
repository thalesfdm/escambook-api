import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { multerUploads } from '../middleware/multer';
import { auth } from '../middleware/auth';

const router = new Router();

// @GET /api/users/:userId

router.get('/:userId', UserController.getById);

// @POST /api/users/login
// @POST /api/users/profilepic
// @POST /api/users/register

router.post('/login', UserController.login);
router.post('/profilepic', auth, multerUploads, UserController.uploadProfilePic);
router.post('/register', UserController.register);

export default router;