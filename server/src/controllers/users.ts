import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";
const prisma = new PrismaClient();

const generateToken = (email: string) => {
  return jwt.sign({ email }, env.JWT_SECRET_TOKEN, {
    expiresIn: "1h",
  });
};

export const signUp: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Email and Password are required!" });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid email address!",
      });
      return;
    }
    if (!validator.isStrongPassword(password)) {
      res
        .status(400)
        .json({ success: false, message: "Please provide a strong password!" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(400).json({ success: false, message: "Invalid Credentials!" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = generateToken(email);

    res.status(201).json({
      success: true,
      message: "User signed up successfully!",
      data: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `${(error as Error).message}` });
    return;
  }
};

export const logIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Email and Password are required!" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(400).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
      return;
    }

    const token = generateToken(email);
    res.status(201).json({
      success: true,
      message: "User logged in successfully!",
      data: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `${(error as Error).message}` });
    return;
  }
};
