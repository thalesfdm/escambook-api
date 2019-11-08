import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class CopyPic extends Model { }

  CopyPic.init({

    copyId: {
      field: 'copyid',
      type: DataTypes.UUID, primaryKey: true
    },

    imageId: {
      field: 'copypic',
      type: DataTypes.UUID, primaryKey: true
    }

  }, {
    sequelize,
    modelName: 'copypics',
    timestamps: false
  });

  return CopyPic;

}