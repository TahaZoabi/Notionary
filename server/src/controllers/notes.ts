import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createNote: RequestHandler = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    if (!title) {
      res
        .status(400)
        .json({ success: false, message: "Note must have a title" });
    }
    if (!userId) {
      res.status(400).json({
        success: false,
        message: "You must be logged in to create a note",
      });
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });

    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `${(error as Error).message}` });
  }
};

export const getNotes: RequestHandler = async (_, res) => {
  try {
    const notes = await prisma.note.findMany();
    if (!notes) {
      res.status(404).json({
        success: false,
        message: "No notes were found",
      });
    }

    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `${(error as Error).message}` });
  }
};
