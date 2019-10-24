import sequelize from '../database/database';

const models = {};

models.Address = sequelize.import('./address.model');
models.Book = sequelize.import('./book.model');
models.Copy = sequelize.import('./copy.model');
models.Image = sequelize.import('./image.model');
models.User = sequelize.import('./user.model');

models.Book.hasOne(models.Copy); // bookId
models.Image.hasOne(models.User); // profilepic
models.User.hasOne(models.Address);
models.User.hasOne(models.Image); // uploaderid

models.Book.hasMany(models.Copy);
models.User.hasMany(models.Copy);

export default models;
