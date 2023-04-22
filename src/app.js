import express, { response } from "express";

const app = express();

const books = [
  {id: 1, "title": "The Lord of the Rings"},
  {id: 2, "title": "The Hobbit"}
];

app.get('/', (request, response) => {
  response.status(200).send('Main')
});

app.get('/books', (request, response) => {
  response.status(200).json(books)
});

export default app;