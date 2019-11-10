import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class SwapUser extends Model { }

  SwapUser.init({

    swapId: {
      field: 'swapid',
      type: DataTypes.UUID, primaryKey: true
    },

    userId: {
      field: 'userid',
      type: DataTypes.UUID, primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'swapusers',
    timestamps: false
  });

  return SwapUser;
}

