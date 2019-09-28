import Sequelize from 'sequelize';
import Joi from '@hapi/joi';


const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

    class Book extends Model {

        static validateBook(book) {

            const schema = {
                title: Joi.string().min(1).max(200).required(),
                author: Joi.string().regex(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/).min(2).max(60).required(),
                isbn: Joi.string().length(13).required(),
                publisher: Joi.string().min(2).max(60),
                edition: Joi.integer(),
                publicationYear: Joi.date(),     
                bookLanguage: Joi.string().min(2).max(30).required()
            }
            return Joi.validate(book, schema);
        }

    }

    Book.init({

        bookId: {
            field: 'bookId',
            type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
        },

        title: {
            field: 'title',
            type: DataTypes.STRING, allowNull: false,
            validate: { len: [1, 200] }
        },

        author: {
            field: 'author',
            type: DataTypes.STRING, allowNull: false,
            validate: { is: /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/, len: [2, 60] }
        },

        isbn: {
            field: 'isbn',
            type: DataTypes.STRING,unique: true, allowNull: false,
            validade: { isNumeric: true,len: [13, 13] }
        },

        publisher: {
            field: 'publisher',
            type: DataTypes.STRING,
            validate: { len: [2, 60] }
        },

        edition: {
            field: 'edition',
            type: DataTypes.INTEGER,
            validate: { isNumeric: true }
        },

        publicationYear: {
            field: 'publicationYear',
            type: DataTypes.DATEONLY,
            validate: { isDate: true }
        },

        bookLanguage: {
            field: 'bookLanguage',
            type: DataTypes.STRING, allowNull: false,
            validate: { len: [2, 30] }
        }

    }, { sequelize, modelName: 'book', timestamps: false });

    return Book;
}