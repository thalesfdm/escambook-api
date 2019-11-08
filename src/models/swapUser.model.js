import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class SwapUser extends Model { }

  SwapUser.init({
    swapId: {
      field: 'swapid',
      type: DataTypes.UUID, autoIncrement: true, primaryKey: true
    },

    userId: {
        field: 'userid',
        type: DataTypes.UUID, autoIncrement: true, primaryKey: true
    }

    }, {
      sequelize,
      modelName: 'swapUser'
    });
  
    return SwapUser;
}
  
