import sequelize from '../database/database';

const models = {};

// models.Book = sequelize.import('./book.model.js');
models.Address = sequelize.import('./address.model');
models.User = sequelize.import('./user.model');

models.User.hasOne(models.Address);

export default models;