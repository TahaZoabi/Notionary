import { Router } from "express";
import * as UsersController from "../controllers/users";
const router = Router();

router.post("/signup", UsersController.signUp);
router.post("/login", UsersController.logIn);
export default router;
