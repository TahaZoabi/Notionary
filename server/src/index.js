import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the home page",
  });
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
  console.log("MongoDB Connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on PORT: ${process.env.PORT}`);
  });
});
