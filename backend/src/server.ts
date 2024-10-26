import "dotenv/config";
import env from "../src/lib/validateEnv";
import mongoose from "mongoose";
import express from "express";
const app = express();

const port = env.PORT;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to Mongoose");
    app.listen(port, () => {
      console.log(`Server is running on PORT:  ${port}`);
    });
  })
  .catch(console.error);
