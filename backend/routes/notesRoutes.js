import express from "express";
import {
  getNotes,
  getNoteByTitle,
  updateNote,
  postNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

//get note by title
router.get("/:title", getNoteByTitle);

//get all notes
router.get("/", getNotes);

//post a note
router.post("/", postNote);

//update a note
router.put("/:title", updateNote);

//delete a note
router.delete("/:title", deleteNote);

export default router;
