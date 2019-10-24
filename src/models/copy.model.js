import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Copy extends Model { }

  Copy.init({

    id: {
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

    available: {
      field: 'available',
      type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true
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
