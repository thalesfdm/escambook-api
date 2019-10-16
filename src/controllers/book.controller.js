import models from "../models";
import Joi from '@hapi/joi';

class BookController {

  // @GET /api/books/
  static async getAll(req, res) {
    const books = await models.Book.findAll();

    if (!books || books.length === 0) {
      return res.status(400).json({ success: false, message: 'no books were found' });
    }

    return res.json({ success: true, message: 'listing all books', books });
  }

  // @GET /api/books/:bookId
  static async getById(req, res) {
    const { error } = Joi.validate(req.params,
      {
        bookId: Joi.number().integer()
      }
    );

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const id = req.params.bookId;
    const book = await models.Book.findOne({ where: { id } });

    if (!book) {
      return res.status(400).json({ success: false, message: 'there is no book with such id' });
    }

    const { title, author, isbn, publisher, edition, publicationYear, bookLanguage, createdAt, updatedAt } = book;

    return res.json({
      success: true, message: 'book found in database', book: {
        bookId: id, title, author, isbn, publisher, edition, publicationYear, bookLanguage, createdAt, updatedAt
      }
    });
  }

  // @POST /api/books/register
  static async registerBook(req, res) {

    const today = new Date();
    const maxPubYear = today.getFullYear();

    const { error } = Joi.validate(req.body,
      {
        title: Joi.string().min(1).max(200).required(),
        author: Joi.string().regex(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/).min(2).max(60).required(),
        isbn: Joi.string().length(13).required(),
        publisher: Joi.string().min(2).max(60),
        edition: Joi.number().integer(),
        publicationYear: Joi.number().min(1000).max(maxPubYear),
        bookLanguage: Joi.string().min(2).max(30).required()
      }
    )

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { title, author, isbn, publisher, edition, publicationYear, bookLanguage } = req.body;
    const book = await models.Book.findOne({ where: { isbn } });

    if (book) {
      return res.status(400).json({ sucess: false, message: "book already exists" });
    }

    try {
      const newBook = await models.Book.create({ title, author, isbn, publisher, edition, publicationYear, bookLanguage });

      return res.json({ sucess: true, message: "registration sucessful", bookId: newBook.id });

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
