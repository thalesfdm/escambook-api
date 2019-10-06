import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Image extends Model { }

  Image.init({

    id: {
      field: 'imageid',
      type: DataTypes.UUID, autoIncrement: true, primaryKey: true
    },

    userId: {
      field: 'uploaderid',
      type: DataTypes.UUID
    },

    cloudImage: {
      field: 'cloudimage',
      type: DataTypes.STRING, unique: true, allowNull: false
    },

    createdAt: {
      field: 'createdat',
      type: DataTypes.DATE, allowNull: false
    },

    updatedAt: {
      field: 'updatedat',
      type: DataTypes.DATE, allowNull: false
    }

  }, { sequelize, modelName: 'image', freezeTableName: true });

  return Image;

}