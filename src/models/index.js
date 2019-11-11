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
models.Copy.hasMany(models.CopyPic);

models.CopyPic.belongsTo(models.Image);

models.Image.belongsTo(models.User); // uploaderid

models.Swap.hasOne(models.SwapCopy);
models.Swap.hasOne(models.SwapUser);

models.SwapCopy.belongsTo(models.Copy); // copyid
//models.SwapCopy.belongsTo(models.Swap); // swapid

//models.SwapUser.belongsTo(models.Swap); // swapid
//models.SwapUser.belongsTo(models.User); // userid

models.User.hasOne(models.Address);
models.User.belongsTo(models.Image); // profilepic
models.User.hasMany(models.Copy);

models.Op = sequelize.Op;

export default models;
