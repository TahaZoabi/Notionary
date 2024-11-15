import "dotenv/config";
import express from "express";
import env from "./util/validateEnv";

import NotesRoutes from "./routes/notes";
import UsersRoutes from "./routes/users";
const app = express();

const port = env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/notes", NotesRoutes);
app.use("/api/auth", UsersRoutes);

app.get("/", (_, res) => {
  res.send({
    welcome: "Hello World!",
  });
});

// No Page Found
app.use((_, res) => {
  res.status(404).json({ error: "Page Not Found!" });
});

// Listen App
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
