import sequelize from '../database/database';

const models = {};

models.Address = sequelize.import('./address.model');
models.Book = sequelize.import('./book.model');
models.Copy = sequelize.import('./copy.model');
models.Image = sequelize.import('./image.model');
models.User = sequelize.import('./user.model');

models.Book.belongsTo(models.Image); // coverpic
models.Book.hasMany(models.Copy);

models.Copy.belongsTo(models.Book);

models.Image.belongsTo(models.User); // uploaderid

models.User.hasOne(models.Address);
models.User.belongsTo(models.Image); // profilepic
models.User.hasMany(models.Copy);

models.Op = sequelize.Op;

export default models;
