import Sequelize from 'sequelize';
import Joi from '@hapi/joi';

const Model = Sequelize.Model;

export default (sequelize, DataTypes) => {

  class User extends Model {

    static validateUser(user) {
      const schema = {
        email: Joi.string().email().min(8).max(40).required(),
        password: Joi.string().min(4).max(16).required(),
        name: Joi.string().regex(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/).min(2).max(60).required(),
        birthDate: Joi.date(),
        phone: Joi.string().length(13)
      }
      return Joi.validate(user, schema);
    }

  }

  User.init({

    userId: {
      field: 'userid',
      type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true
    },

    email: {
      field: 'email',
      type: DataTypes.STRING, unique: true, allowNull: false,
      validate: { isEmail: true, len: [8, 40] }
    },

    password: {
      field: 'password',
      type: DataTypes.STRING, allowNull: false,
      validate: { len: [2, 256] }
    },

    name: {
      field: 'name',
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
    }

  }, { sequelize, modelName: 'users', timestamps: false });

  return User;
}