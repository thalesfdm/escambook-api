import models from "../models";
import Joi from '@hapi/joi';

class BookController {

    //@POST /api/book/register
    static async registerBook(req, res) {
        
        const { error } = Joi.validate(req.body,
            {
                title: Joi.string().min(1).max(200).required(),
                author: Joi.string().regex(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/).min(2).max(60).required(),
                isbn: Joi.string().length(13).required(),
                publisher: Joi.string().min(2).max(60),
                edition: Joi.number().integer(),
                publicationYear: Joi.date(),     
                bookLanguage: Joi.string().min(2).max(30).required()
            }
        )

        if(error){
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { title, author, isbn, publisher, edition, publicationYear, bookLanguage } = req.body;
        const book = await models.Book.findOne({ where: {isbn} });

        if(book) {
            return res.status(400).json({ sucess: false, message: "book already exists" });
        }

        try {
            const newBook = await models.Book.create({ title, author, isbn, publisher, edition, publicationYear, bookLanguage });
            
            return res.json({ sucess: true, message: "registration sucessful", bookId: newBook.bookId });

        } catch (e) {
            const error = {};

            for (let i in e.errors) {
                error[e.errors[i].validatorKey] = e.errors[i].message;
            }

            if (Object.keys(error).length > 0) {
                return res.status(400).json({ sucess: false, message: error });
            } else {
                return res.status(400).json({ sucess: false, message: e.toString() });
            }
        }
    }
}

export default BookController;
