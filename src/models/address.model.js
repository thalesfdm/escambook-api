import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class Address extends Model { }

  Address.init({

    userId: {
      field: 'userid',
      type: DataTypes.UUID, primaryKey: true
    },

    city: {
      field: 'city',
      type: DataTypes.STRING, allowNull: false,
      validate: { len: [2, 60] }
    },

    district: {
      field: 'district',
      type: DataTypes.STRING, allowNull: false,
      validate: { len: [2, 30] }
    },

    postalCode: {
      field: 'postalcode',
      type: DataTypes.STRING, allowNull: false,
      validate: { len: [8, 8] }
    },

    street: {
      field: 'street',
      type: DataTypes.STRING,
      validate: { len: [0, 40] }
    },

    houseNumber: {
      field: 'housenumber',
      type: DataTypes.STRING,
      validate: { isNumeric: true, len: [0, 8] }
    }

  }, {
    sequelize,
    modelName: 'addresses',
    timestamps: false
  });

  return Address;

}