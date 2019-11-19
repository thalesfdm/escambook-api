import sequelize from '../database/database';

const models = {};

models.Address = sequelize.import('./address.model');
models.Book = sequelize.import('./book.model');
models.Copy = sequelize.import('./copy.model');
models.CopyPic = sequelize.import('./copypic.model');
models.Image = sequelize.import('./image.model');
models.Swap = sequelize.import('./swap.model');
models.SwapCopy = sequelize.import('./swapcopy.model');
models.SwapUser = sequelize.import('./swapuser.model');
models.User = sequelize.import('./user.model');

models.Book.belongsTo(models.Image); // coverpic
models.Book.hasMany(models.Copy);

models.Copy.belongsTo(models.Book);
models.Copy.belongsTo(models.User);
models.Copy.hasMany(models.CopyPic);

models.CopyPic.belongsTo(models.Image);

models.Image.belongsTo(models.User); // uploaderid

// models.Copy.belongsToMany(models.Swap, { through: models.SwapCopy });
models.User.belongsToMany(models.Swap, { through: models.SwapUser });

// models.Swap.belongsToMany(models.Copy, { through: models.SwapCopy });
models.Swap.belongsToMany(models.User, { through: models.SwapUser });

models.Swap.hasMany(models.SwapCopy);
models.Swap.hasMany(models.SwapUser);

models.SwapCopy.belongsTo(models.Copy);
models.SwapUser.belongsTo(models.User);

models.User.hasOne(models.Address);
models.User.belongsTo(models.Image); // profilepic
models.User.hasMany(models.Copy);

models.Op = sequelize.Op;

export default models;
