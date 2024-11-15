import { Router } from "express";
import * as NotesController from "../controllers/notes";

const router = Router();

router.route("/").post(NotesController.createNote);

export default router;
