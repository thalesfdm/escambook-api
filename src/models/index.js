import sequelize from '../database/database';

const models = {};

models.Address = sequelize.import('./address.model');
models.Book = sequelize.import('./book.model.js');
models.Image = sequelize.import('./image.model.js');
models.User = sequelize.import('./user.model');

models.Image.hasOne(models.User); // profilepic
models.User.hasOne(models.Address);
models.User.hasOne(models.Image); // uploaderid

export default models;