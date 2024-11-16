import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the home page",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on PORT: ${process.env.PORT}`);
});
