import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import validator from "validator";

export const requireAuth = async (req, res, next) => {
  const authUserId = req.session.userId;

  try {
    if (!authUserId) {
      return res
        .status(403)
        .json({ success: false, message: "user not authenticated" });
    }

    const user = await UserModel.findById(authUserId).select("+email").exec();

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not authenticated" });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};

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

    req.session.userId = newUser._id;

    return res.status(201).json({
      success: true,
      message: "User signed up successfully!",
      data: newUser,
    });
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};

export const logIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "username and password are required" });
  }

  const user = await UserModel.findOne({ username })
    .select("+password +email")
    .exec();

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid Credentials" });
  }

  req.session.userId = user._id;
  return res.status(200).json({
    success: true,
    message: "User logged in successfully!",
    data: user,
  });
  try {
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
};

export const logOut = async (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(`ERROR: ${error}`);
    return res.status(200).json({
      success: true,
      message: "User logged out successfully!",
      data: {},
    });
  });
};
