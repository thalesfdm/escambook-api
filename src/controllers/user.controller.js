import models from "../models";
import bcrypt from "bcrypt";

class UserController {

  static async register(req, res) {

    const { error } = models.User.validateUser(req.body);

    if (error) {
      res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    } else {
      const { email, password, name, birthDate, phone } = req.body;
      const user = await models.User.findOne({ where: { email } });
      if (user) {
        res.status(400).json({
          success: false,
          message: "This e-mail is already in use."
        });
      } else {
        try {
          const saltRounds = 10;
          const hash = await bcrypt.hash(password, saltRounds);
          const newUser = await models.User.create({
            email,
            password: hash,
            name,
            birthDate,
            phone
          });
          res.json({
            success: true,
            message: "Registration successful.",
            userId: newUser.id
          });
        } catch (e) {
          const error = {};
          for (let i in e.errors) {
            error[e.errors[i].validatorKey] = e.errors[i].message;
          }
          res
            .status(400)
            .json({ success: false, message: "Something went wrong.", error });
        }
      }
    }
  }

}

export default UserController;
