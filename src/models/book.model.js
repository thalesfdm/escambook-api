import Sequelize from 'sequelize';
import Joi from '@hapi/joi';


const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

    class Book extends Model {

        static validateBook(book) {

            const schema = {
                title: Joi.string().min(1).max(200).required(),
                author: Joi.string().regex(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/).min(2).max(60).required(),
                isbn: Joi.string().isbn().length(13).required(),
                publisher: Joi.string().min(2).max(60).required(),
                edition: Joi.string().min(1).max(3).required(),
                age: Joi.string().length(4).required(),     
                idiom: Joi.string().min(2).max(30).required()
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
            validade: { len: [13, 13]}
        },

        publisher: {
            field: 'publisher',
            type: DataTypes.STRING,
            validate: { len: [2, 60]}
        },

        edition: {
            field: 'edition',
            type: DataTypes.STRING,
            validate: { len: [1, 3]}
        },

        age: {
            field: 'age',
            type: DataTypes.STRING,
            validate: { len: [4, 4]}
        },

        idiom: {
            field: 'idiom',
            type: DataTypes.STRING, allowNull: false,
            validate: { len: [2, 30]}
        }

    }, { sequelize, modelName: 'book', timestamps: false });

    return Book;
}