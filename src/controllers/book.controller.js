import models from "../models";
import Joi from '@hapi/joi';
import { dataUri } from '../middleware/multer';
import { v2 } from 'cloudinary/lib/cloudinary';

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

  // @POST /api/books/coverpic
  static async addCoverPic(req, res) {

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'no image provided' });
    }

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'invalid authentication' });
    }

    const bookId = req.body.bookId;

    const { error } = Joi.validate(req.body,
      {
        bookId: Joi.number().integer().required()
      }
    );

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = await models.User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'there is no user with such id' });
    }

    const book = await models.Book.findOne({ where: { id: bookId } });

    if (!book) {
      return res.status(400).json({ success: false, message: 'there is no book with such id' });
    }

    const file = dataUri(req).content;

    try {
      const result = await v2.uploader.upload(file,
        {
          allowed_formats: ['jpg', 'png'],
          folder: 'coverpic',
          public_id: `book-${bookId}-coverpic`
        });

      const cloudImage = result.url;

      let image = {};

      if (book.imageId) {
        image = await models.Image.findOne({ where: { id: book.imageId } });
        await models.Image.update({ cloudImage }, { where: { id: book.imageId } });
      } else {
        image = await models.Image.create({ userId, cloudImage });
        await models.Book.update({ imageId: image.id }, { where: { id: bookId } });
      }

      return res.json({ success: true, message: 'image uploaded', bookId, cloudImage });

    } catch (e) {
      return res.status(400).json({ success: false, message: 'could not upload image' });
    }

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
      const newBook = await models.Book.create({
        title, author, isbn, publisher, edition, publicationYear, bookLanguage
      });

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
