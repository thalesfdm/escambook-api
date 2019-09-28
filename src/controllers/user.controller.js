import models from "../models";
import bcrypt from "bcrypt";

class UserController {

  // @POST /api/users/register
  static async register(req, res) {

    const { error } = models.User.validateUser(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, password, name, birthDate, phone } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ success: false, message: "email already exists" });
    }

    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const newUser = await models.User.create({ email, password: hash, name, birthDate, phone });

      return res.json({ success: true, message: "registration successful.", userId: newUser.id });

    } catch (e) {
      const error = {};

      for (let i in e.errors) {
        error[e.errors[i].validatorKey] = e.errors[i].message;
      }

      if (Object.keys(error).length > 0) {
        return res.status(400).json({ success: false, message: error });
      } else {
        return res.status(400).json({ success: false, message: e.toString().slice(7) });
      }

    }

  }

}

export default UserController;