import { Router } from "express";
import * as UserController from "../controllers/users.js";
const router = Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.logIn);
router.post("/logout", UserController.logOut);

export default router;
