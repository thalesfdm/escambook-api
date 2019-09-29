import models from '../models';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/auth';

class UserController {

  // @POST /api/users/login
  static async login(req, res) {

    const { error } = Joi.validate(req.body,
      {
        email: Joi.string().email().max(40).required(),
        password: Joi.string().max(16).required()
      }
    )

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'email is not registered' });
    }

    try {

      if (await bcrypt.compare(password, user.password)) {
        const token = generateToken(user);
        return res.header('x-auth-token', token).json({ success: true, message: 'logged in successfully', token });
      } else {
        return res.status(400).json({ success: false, message: 'invalid password' });
      }

    } catch (e) {
      return res.status(400).json({ success: false, message: 'something went wrong' });
    }

  }

  // @POST /api/users/register
  static async register(req, res) {

    const today = new Date();
    const maxDate = today.setFullYear(today.getFullYear() - 12);

    const { error } = Joi.validate(req.body,
      {
        email: Joi.string().email().max(40).required(),
        password: Joi.string().min(4).max(16).required(),
        name: Joi.string().regex(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/).min(4).max(60).required(),
        birthDate: Joi.date().less(maxDate),
        phone: Joi.string().length(13),
        city: Joi.string().min(4).max(60).required(),
        district: Joi.string().length(2).required(),
        postalCode: Joi.string().length(8).required(),
        street: Joi.string().max(40),
        houseNumber: Joi.string().max(6)
      }
    )

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, password, name, birthDate, phone, city, district, postalCode, street, houseNumber } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ success: false, message: 'email already exists' });
    }

    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const user = await models.User.create({
        email, password: hash, name, birthDate, phone,
        address: { city, district, postalCode, street, houseNumber }
      }, { include: models.Address });

      return res.json({ success: true, message: 'registration successful', id: user.id });

    } catch (e) {
      const error = {};

      for (let i in e.errors) {
        error[e.errors[i].validatorKey] = e.errors[i].message;
      }

      if (Object.keys(error).length > 0) {
        return res.status(400).json({ success: false, message: error });
      } else {
        return res.status(400).json({ success: false, message: e.toString() });
      }

    }

  }

}

export default UserController;