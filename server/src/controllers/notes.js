import NoteModel from "../models/notes.js";
export const createNote = async (req, res) => {
  const { title, description } = req.body;
  console.log("Creating note with data:", req.body); // Debug log
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

    return res.status(201).json({
      success: true,
      message: "Here is your notes!",
      data: notes,
    });
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};
