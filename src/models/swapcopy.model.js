import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class SwapCopy extends Model { }

  SwapCopy.init({

    swapId: {
      field: 'swapid',
      type: DataTypes.UUID, primaryKey: true
    },

    copyId: {
      field: 'copyid',
      type: DataTypes.UUID, primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'swapcopies',
    timestamps: false
  });

  return SwapCopy;
}

