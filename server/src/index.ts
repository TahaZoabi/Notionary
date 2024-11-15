import "dotenv/config";
import express from "express";
import env from "./util/validateEnv";

const app = express();

const port = env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (_, res) => {
  res.send({
    welcome: "Hello World!",
  });
});

// Listen App
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
