import express from "express";
import BookController from "../controllers/booksController.js";

const router = express.Router();

router
    .get("/books", BookController.getAll)
    .get("/books/search", BookController.getByEditor)
    .get("/books/:id", BookController.getById)
    .post("/books", BookController.create)
    .put("/books/:id", BookController.update)
    .delete("/books/:id", BookController.delete)

export default router;