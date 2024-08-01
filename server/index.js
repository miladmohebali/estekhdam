import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/books", booksRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("app connected to db");
    app.listen(PORT, () => {
      console.log(`app is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
