import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, select: false, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);
// Create the model from the schema
const User = mongoose.model("User", userSchema);

export default User;
