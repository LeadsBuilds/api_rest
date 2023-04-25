import books from "../models/Book.js";

class BookController {
    static getAll = (request, response) => {
        books.find()
        .populate('author')
        .exec((err, books) => {
            response.status(200).json(books);
        });
    }

    static getById = (request, response) => {
        const id = request.params.id;
        books.findById(id)
        .populate('author', 'name')
        .exec((err, books) => {
            if(err) {
                response.status(400).send({message: `Erro: book not found`})
                return;
            }

            response.status(200).send(books);
        });
    }

    static getByEditor = (request, response) => {
        const editor = request.query.editor;
        books.find({'editor': editor}, {})
        .populate('author', 'name')
        .exec((err, books) => {
            if(err) {
                response.status(400).send({message: `Erro: book not found`})
                return;
            }

            response.status(200).send(books);
        });
    }

    static create = (request, response) => {
        const book = new books(request.body);
        book.save((err) => {
            if(err) {
                response.status(500).send({message: `Error: book hasn't been created - ${err.message}`})
                return;
            }

            response.status(201).send(book.toJSON());
        });
    }

    static update = (request, response) => {
        const id = request.params.id;

        books.findByIdAndUpdate(id, {$set: request.body}, (err) => {
            if(err) {
                response.status(500).send({message: err.message});
                return;
            }
    
            response.status(200).send({message: `Book ${id} has been updated`});
        });
    }

    static delete = (request, response) => {
        const id = request.params.id;

        books.findByIdAndDelete(id, (err) => {
            if(err) {
                response.status(500).send({message: `Error: couldn't delete the resource - ${err.message}`})
                return;
            }

            response.status(200).send({message: "The book has been deleted"});
        })
    }
}

export default BookController;