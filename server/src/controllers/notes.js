import NoteModel from "../models/notes.js";
import mongoose from "mongoose";
export const createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "title and description are required",
      });
    }

    const newNote = await NoteModel.create({
      title,
      description,
      userId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully!",
      data: newNote,
    });
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};

export const getNotes = async (req, res) => {
  const { userId } = req.session;

  try {
    const notes = await NoteModel.find({ userId });
    if (!notes) {
      return res.status(404).json({
        success: false,
        message: "no notes were found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Here is your notes!",
      data: notes,
    });
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};

export const deleteNote = async (req, res) => {
  const { _id } = req.params;

  try {
    // Validate the ObjectId
    if (!mongoose.isValidObjectId(_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Note ID format.",
      });
    }
    // Find the note by ID
    const note = await NoteModel.findById(_id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: " notes was not found",
      });
    }

    await note.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Note deleted successfully!",
      data: {},
    });
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};
