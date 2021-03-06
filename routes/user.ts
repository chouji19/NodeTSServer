import express, { Request, Response } from 'express';
import { User } from '../models/user';
import * as userController from '../controllers/userController';
import authorize from '../middleware/auth.middleware';


const router = express.Router();

router.get('/', authorize, userController.getUsers);

router.post('/', userController.saveUser);

export { router as userRouter }
