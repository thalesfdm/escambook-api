import models from "../models";


class BookController {

    //@POST /api/book/register
    static async registerBook(req, res) {
        
        const { error } = models.Book.validateBook(req.body);

        if(error){
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const { title, author, isbn, publisher, edition, publicationYear, bookLanguage } = req.body;
        const book = await models.Book.findOne({ where: {isbn} });

        if(book) {
            return res.status(400).json({ sucess: false, message: "Book register already exists" });
        }

        try {
            const newBook = await models.Book.create({ title, author, isbn, publisher, edition, publicationYear, bookLanguage });
            
            return res.json({ sucess: true, message: "book registration sucessful.", bookId: newBook.bookId });

        } catch (e) {
            const error = {};

            for (let i in e.errors) {
                error[e.errors[i]] = e.errors[i].message;
            }
        }
    }
}