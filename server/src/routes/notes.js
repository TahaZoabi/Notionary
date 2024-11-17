import { Router } from "express";
import { requireAuth } from "../controllers/users.js";
import * as NotesController from "../controllers/notes.js";
const router = Router();

router.use(requireAuth);

router.post("/", NotesController.createNote);
router.get("/", NotesController.getNotes);

export default router;
