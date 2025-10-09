import express from 'express';
import { PostController } from './post.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();
router.get("/stats",
      multerUpload.single("file"),
      PostController.getBlogStat
)

router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.post("/create", PostController.createPost)
router.patch("/update/:id", PostController.updatePost);
router.delete("/delete/:id", PostController.deletePost);


export const postRouter = router;