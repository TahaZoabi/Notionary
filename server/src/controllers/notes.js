import NoteModel from "../models/notes.js";
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  console.log("Creating note with data:", req.body); // Debug log
  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "title and content are required" });
    }

    const note = await NoteModel.create({
      title,
      content,
      userId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully!",
      data: note,
    });
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};
