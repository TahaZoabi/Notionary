import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import validator from "validator";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address!",
    });
  }
  if (!validator.isStrongPassword(password)) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a strong password!" });
  }

  try {
    const existingUser = await UserModel.findOne({
      username,
      email,
    }).exec();
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User signed up successfully!",
      data: newUser,
    });
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};
