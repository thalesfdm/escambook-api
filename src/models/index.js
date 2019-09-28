import sequelize from '../database/database';

const models = {};

models.Book = sequelize.import('./book.model.js');
models.User = sequelize.import('./user.model.js');

export default models;