import Sequelize from 'sequelize';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class User extends Model { }

  User.init({

    id: {
      field: 'userid',
      type: DataTypes.UUID, autoIncrement: true, primaryKey: true
    },

    email: {
      field: 'email',
      type: DataTypes.STRING, unique: true, allowNull: false,
      validate: { isEmail: true, len: [8, 40] }
    },

    password: {
      field: 'passwordhash',
      type: DataTypes.STRING, allowNull: false,
      validate: { len: [2, 256] }
    },

    cpf: {
      field: 'cpf',
      type: DataTypes.STRING, unique: true, allowNull: false,
      validate: { isNumeric: true, len: [11, 11] }
    },

    name: {
      field: 'fullname',
      type: DataTypes.STRING, allowNull: false,
      validate: { is: /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/, len: [2, 60] }
    },

    birthDate: {
      field: 'birthdate',
      type: DataTypes.DATEONLY,
      validate: { isDate: true }
    },

    phone: {
      field: 'phone',
      type: DataTypes.STRING, unique: true,
      validate: { isNumeric: true, len: [13, 13] }
    },

    imageId: {
      field: 'profilepic',
      type: DataTypes.INTEGER, unique: true
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
    modelName: 'users',
    hooks: {
      beforeCreate: function (user, options) {
        let ageCheck = new Date();
        ageCheck.setFullYear(ageCheck.getFullYear() - 12);
        let birthDate = new Date(user.birthDate);
        if (ageCheck < birthDate) {
          throw new Error('user must be older than 12 years old');
        }
      }
    }
  });

  return User;

}
