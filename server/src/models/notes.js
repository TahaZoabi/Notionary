import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
// Create the model from the schema
const Note = mongoose.model("Note", noteSchema);

export default Note;
