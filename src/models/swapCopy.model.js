import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class SwapCopy extends Model { }

  SwapCopy.init({
    swapId: {
      field: 'swapid',
      type: DataTypes.UUID, autoIncrement: true, primaryKey: true
    },

    copyId: {
        field: 'copyid',
        type: DataTypes.UUID, autoIncrement: true, primaryKey: true
    }

    }, {
      sequelize,
      modelName: 'swapCopy' 
    });
  
    return SwapCopy;
}
  
