import express from 'express';
import { UserController } from './user.contoller';
import { Role } from '@prisma/client';
import { checkAuth } from '../../middlewares/checkAuth';

const router = express.Router();

router.get(
    "/",
    checkAuth(Role.ADMIN, Role.OWNER), 
    UserController.getAllFromDB
)

router.get(
    "/:id",
    checkAuth(Role.ADMIN, Role.OWNER), 
    UserController.getUserById
)

router.post(
    "/register",
    checkAuth(Role.OWNER), 
    UserController.createUser
)

router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.OWNER), 
    UserController.updateUser
)

router.delete(
    "/:id",
    checkAuth(Role.OWNER), 
    UserController.deleteUser
)

export const userRouter = router;