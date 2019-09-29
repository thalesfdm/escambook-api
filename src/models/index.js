import sequelize from '../database/database';

const models = {};

models.Address = sequelize.import('./address.model');
models.Book = sequelize.import('./book.model.js');
models.User = sequelize.import('./user.model');

models.User.hasOne(models.Address);

export default models;