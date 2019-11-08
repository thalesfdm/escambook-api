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
      type: DataTypes.STRING,
      validate: { len: [4, 60] }
    },

    endAt: {
      field: 'endat',
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
      modelName: 'swap'
    });
  
    return Swap;
}
  
