import express, { Request, Response } from 'express';
import { User } from '../models/user';
import * as authController from '../controllers/authController';
import authorize from '../middleware/auth.middleware';


const router = express.Router();

router.post('/login', [], authController.authenticateUser);

export { router as authRouter }