import express from "express";
import db from "../config/dbConnect.js";

db.on("error", console.log.bind(console, 'Connection Error'));
db.once("open", () => {
  console.log("Mongodb Connection has been stablished")
});

const app = express();

app.use(express.json());

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

app.post('/books', (request, response) => {
  books.push(request.body);
  response.status(201).send('Book has been added.');
});

app.put('/books/:id', (request, response) => {
  let {id} = request.params;
  const index = findBook(id);
  books[index].title = request.body.title;
  response.json(books);
});

app.get('/books/:id', (request, response) => {
  let {id} = request.params;
  const index = findBook(id);
  response.json(books[index]);
});

app.delete('/books/:id', (request, response) => {
  let {id} = request.params;
  const index = findBook(id);
  books.splice(index, 1);
  response.send(`Book ${id} has been deleted`)
});

function findBook(id) {
  return books.findIndex(item => item.id == id);
}

export default app;