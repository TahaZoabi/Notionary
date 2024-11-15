import { Router } from "express";
import * as UsersController from "../controllers/users";
const router = Router();

router.post("/signup", UsersController.signUp);
export default router;
