import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
const app = express();
import UserRoutes from "./routes/users.js";
app.use(express.json());

app.use("/api/users", UserRoutes);

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
