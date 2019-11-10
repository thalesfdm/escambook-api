import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Swap extends Model { }

  Swap.init({

    id: {
      field: 'swapid',
      type: DataTypes.UUID, autoIncrement: true, primaryKey: true
    },

    category: {
      field: 'category',
      type: DataTypes.STRING, allowNull: false,
      validate: { len: [1, 1], isIn: [['E', 'T']] }
    },

    situation: {
      field: 'situation',
      type: DataTypes.STRING, allowNull: false,
      validate: { len: [1, 1], isIn: [['A', 'C', 'I', 'F']] }
    },

    expiresAt: {
      field: 'expiresat',
      type: DataTypes.DATE, allowNull: false
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
    modelName: 'swaps'
  });

  return Swap;
}

