import { Router } from "express";
import * as NotesController from "../controllers/notes";

const router = Router();

router
  .route("/")
  .post(NotesController.createNote)
  .get(NotesController.getNotes);

export default router;
