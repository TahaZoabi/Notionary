import { Router } from "express";
import { requireAuth } from "../controllers/users.js";
import * as NotesController from "../controllers/notes.js";
const router = Router();

router.use(requireAuth);

router.post("/", NotesController.createNote);
router.get("/", NotesController.getNotes);
router.patch("/:_id", NotesController.updateNote);
router.delete("/:_id", NotesController.deleteNote);

export default router;
