import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Copy extends Model { }

  Copy.init({

    copyId: {
      field: 'copyid',
      type: DataTypes.UUID, autoIncrement: true, primaryKey: true
    },

    userId: {
      field: 'ownerid',
      type: DataTypes.UUID, allowNull: false
    },

    bookId: {
      field: 'bookid',
      type: DataTypes.UUID, allowNull: false
    },

    condition: {
      field: 'condition',
      type: DataTypes.STRING, allowNull: false,
      validate: { len: [2, 40] }
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
    modelName: 'copies'
  });

  return Copy;
}
