import express from 'express';
import { AuthController } from './auth.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '@prisma/client';

const router = express.Router();

router.post(
    "/login",
    AuthController.login
)
router.post("/logout", AuthController.logout);
router.post("/change-password", checkAuth(...Object.values(Role)), AuthController.changePassword)

export const authRouter = router;