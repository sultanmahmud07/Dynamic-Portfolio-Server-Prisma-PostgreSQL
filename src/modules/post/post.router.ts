import express from 'express';
import { PostController } from './post.controller';
import { multerUpload } from '../../config/multer.config';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '@prisma/client';

const router = express.Router();
router.get("/stats",
      checkAuth(...Object.values(Role)),
      PostController.getBlogStat
)

router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);

router.post("/create",
      checkAuth(...Object.values(Role)),
      multerUpload.single("file"),
      PostController.createPost);

router.patch("/update/:id",
      checkAuth(...Object.values(Role)),
      multerUpload.single("file"),
      PostController.updatePost);

router.delete("/delete/:id",
      checkAuth(...Object.values(Role)),
      PostController.deletePost);


export const postRouter = router;