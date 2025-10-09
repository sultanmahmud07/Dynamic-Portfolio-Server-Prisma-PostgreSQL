import express from 'express';
import { PostController } from './post.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();
router.get("/stats",
      PostController.getBlogStat
)

router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.post("/create",
      multerUpload.single("file"),
      PostController.createPost);
router.patch("/update/:id",
      multerUpload.single("file"),
      PostController.updatePost);
router.delete("/delete/:id", PostController.deletePost);


export const postRouter = router;