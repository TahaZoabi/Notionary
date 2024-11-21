import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
import UserRoutes from "./routes/users.js";
import NotesRoutes from "./routes/notes.js";
import session from "express-session";
import MongoStore from "connect-mongo";

// Middleware
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
    }),
  }),
);

app.use(
  cors({
    origin: ["http://localhost:3000", "https://notionary.netlify.app/"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/notes", NotesRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the home page",
  });
});

// Endpoint not found
app.use((_, res) => {
  res.status(404).json({ error: "Page Not Found!" });
});

// Database connection and Listen app
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
  console.log("MongoDB Connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on PORT: ${process.env.PORT}`);
  });
});
