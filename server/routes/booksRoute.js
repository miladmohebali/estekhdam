import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!(req.body.title || req.body.author || req.body.publishYear)) {
      return res.status(400).send({ message: "send all required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(req.params);
    if (!(req.body.title || req.body.author || req.body.publishYear)) {
      return res.status(400).send({ message: "send all required fields" });
    }
    const { id } = req.params;
    const book = await Book.insert_one(id, req.body);
    return res.status(200).send({ message: "book updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    console.log(book);
    return res.status(200).send({ message: "book deleted sucessfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
