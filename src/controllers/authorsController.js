import authors from "../models/Author.js";

class AuthorController {
    static getAll = (request, response) => {
        authors.find((err, authors) => {
            response.status(200).json(authors);
        });
    }

    static getById = (request, response) => {
        const id = request.params.id;
        authors.findById(id, (err, authors) => {
            if(err) {
                response.status(400).send({message: `Erro: Author not found`})
                return;
            }

            response.status(200).send(authors);
        });
    }

    static create = (request, response) => {
        const author = new authors(request.body);
        author.save((err) => {
            if(err) {
                response.status(500).send({message: `Error: Author hasn't been created - ${err.message}`})
                return;
            }

            response.status(201).send(author.toJSON());
        });
    }

    static update = (request, response) => {
        const id = request.params.id;

        authors.findByIdAndUpdate(id, {$set: request.body}, (err) => {
            if(err) {
                response.status(500).send({message: err.message});
                return;
            }
    
            response.status(200).send({message: `Author ${id} has been updated`});
        });
    }

    static delete = (request, response) => {
        const id = request.params.id;

        authors.findByIdAndDelete(id, (err) => {
            if(err) {
                response.status(500).send({message: `Error: couldn't delete the resource - ${err.message}`})
                return;
            }

            response.status(200).send({message: "The Author has been deleted"});
        })
    }
}

export default AuthorController;