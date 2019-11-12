import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { multerUploads } from '../middleware/multer';
import { auth } from '../middleware/auth';

const router = new Router();

// @GET /api/users/all/books
// @GET # /api/users/me
// @GET /api/users/:userId
// @GET /api/users/:userId/books

router.get('/all/books', UserController.getAllBooks);
router.get('/me', auth, UserController.myProfile);
router.get('/:userId', UserController.getById);
router.get('/:userId/books', UserController.getCopies);

// @POST /api/users/login
// @POST # /api/users/profilepic
// @POST /api/users/register

router.post('/login', UserController.login);
router.post('/profilepic', auth, multerUploads, UserController.addProfilePic);
router.post('/register', UserController.register);

export default router;