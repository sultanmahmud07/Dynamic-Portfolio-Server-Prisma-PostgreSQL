import express from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '@prisma/client';
import { ProjectController } from './post.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();
router.get("/", ProjectController.getAllProjects);

router.get("/:slug", ProjectController.getProjectById);

router.post("/create",
      checkAuth(...Object.values(Role)),
      multerUpload.array("files"),
      ProjectController.createProject);

router.patch("/update/:id",
      checkAuth(...Object.values(Role)),
      multerUpload.array("files"),
      ProjectController.updateProject);

router.delete("/delete/:id",
      checkAuth(...Object.values(Role)),
      ProjectController.deleteProject);


export const projectRouter = router;