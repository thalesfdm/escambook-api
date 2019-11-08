import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Book extends Model { }

  Book.init({

    id: {
      field: 'bookid',
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
      type: DataTypes.STRING, unique: true, allowNull: false,
      validate: { isNumeric: true, len: [13, 13] }
    },

    publisher: {
      field: 'publisher',
      type: DataTypes.STRING,
      validate: { len: [2, 60] }
    },

    edition: {
      field: 'editionnumber',
      type: DataTypes.INTEGER,
      validate: { isNumeric: true }
    },

    publicationYear: {
      field: 'pubyear',
      type: DataTypes.INTEGER,
      validate: { min: 1000 }
    },

    bookLanguage: {
      field: 'booklanguage',
      type: DataTypes.STRING, allowNull: false,
      validate: { len: [2, 30] }
    },

    imageId: {
      field: 'coverpic',
      type: DataTypes.INTEGER, unique: true
    },

    createdAt: {
      field: 'createdat',
      type: DataTypes.DATE, allowNull: false
    },

    updatedAt: {
      field: 'updatedat',
      type: DataTypes.DATE, allowNull: false
    }

  }, {
    sequelize,
    modelName: 'books',
    hooks: {
      beforeCreate: function (book, options) {
        let yearCheck = new Date();
        yearCheck = yearCheck.getFullYear();
        let pubYear = book.publicationYear;
        if (pubYear > yearCheck) {
          throw new Error(`max publicationYear is ${yearCheck}`);
        }
      }
    }
  });

  return Book;

}
