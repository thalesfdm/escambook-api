import models from '../models';
import Joi from '@hapi/joi';

class CopyController {

  // @POST /api/users/books/add
  static async addCopy(req, res) {

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'invalid authentication' });
    }

    const { error } = Joi.validate(req.body,
      {
        bookId: Joi.number().integer().required(),
        condition: Joi.string().min(2).max(40).required()
      }
    );

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { bookId, condition } = req.body;
    const book = await models.Book.findOne({ where: { id: bookId } });

    if (!book) {
      return res.status(400).json({ success: false, message: 'book not found' });
    }

    try {
      const copy = await models.Copy.create({ userId, bookId, condition });

      return res.json({ sucess: true, message: "registration sucessful", copyId: copy.id, userId, bookId });

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

  // @DELETE /api/users/books/:copyId
  static async delCopy(req, res) {

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'invalid authentication' });
    }

    const { error } = Joi.validate(req.params,
      {
        copyId: Joi.number().integer().required(),
      }
    );

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const copyId = req.params.copyId;
    const copy = await models.Copy.findOne({ where: { id: copyId, userId } });

    if (!copy) {
      return res.status(400).json({ success: false, message: 'invalid copy or user' });
    }

    try {
      await models.Copy.destroy({ where: { id: copyId } });

      return res.json({ sucess: true, message: 'copy succesfully removed', removed: copy });

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

  // @PUT /api/users/books/:copyId/tag
  static async tagCopy(req, res) {

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'invalid authentication' });
    }

    const { error } = Joi.validate(req.params,
      {
        copyId: Joi.number().integer().required(),
      }
    );

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const copyId = req.params.copyId;
    const copy = await models.Copy.findOne({ where: { id: copyId, userId } });

    if (!copy) {
      return res.status(400).json({ success: false, message: 'invalid copy or user' });
    }

    try {
      
      const available = !copy.available;

      
      await models.Copy.update({ available }, { where: { id: copyId  } });
      

      return res.json({ sucess: true, message: 'succesfully tagged', Copy:{
        copyId, available
      }});

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

export default CopyController;