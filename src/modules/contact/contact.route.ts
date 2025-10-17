import { Router } from "express";
import { ContactController } from "./contact.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/create", 
      ContactController.createContact);

router.get("/all-contact",checkAuth(Role.ADMIN, Role.OWNER), ContactController.getContactByAdmin);
router.delete("/:id", checkAuth(Role.ADMIN, Role.OWNER), ContactController.deleteContact);

export const ContactRoutes = router;
