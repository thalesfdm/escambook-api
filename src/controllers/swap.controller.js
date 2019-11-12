import models from '../models';
import Joi from '@hapi/joi';

class SwapController {

  // @GET # /api/swaps/pending
  static async getPending(req, res) {

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'invalid authentication' });
    }

    const swaps = await models.Swap.findAll({
      where: { situation: 'A' }, required: true,
      include: [
        { model: models.SwapUser, required: true }, {
          model: models.SwapCopy, required: true, include:
            { model: models.Copy, where: { userId }, required: true }
        }]
    });

    if (!swaps || swaps.length === 0) {
      return res.json({ success: false, message: 'no pending swaps were found' });
    }

    return res.json({ success: true, message: `${swaps.length} pending swaps were found`, swaps });

  }

  // @GET # /api/swaps/pending/mine
  static async getPendingMine(req, res) {

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'invalid authentication' });
    }

    const swaps = await models.Swap.findAll({
      where: { situation: 'A' }, required: true,
      include: [
        { model: models.SwapUser, where: { userId }, required: true }, {
          model: models.SwapCopy, required: true, include:
            { model: models.Copy, required: true }
        }]
    });

    if (!swaps || swaps.length === 0) {
      return res.json({ success: false, message: 'no pending swaps were found' });
    }

    return res.json({ success: true, message: `${swaps.length} pending swaps were found`, swaps });

  }

  // @POST # /api/swaps/start
  static async startSwap(req, res) {

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'invalid authentication' });
    }

    const { error } = Joi.validate(req.body,
      {
        copyId: Joi.number().integer().required(),
        category: Joi.string().valid('E', 'T').required(),
        expiresAt: Joi.date().required()
      }
    );

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { copyId, category, expiresAt } = req.body;
    const copy = await models.Copy.findOne({ where: { id: copyId } });

    if (!copy) {
      return res.status(400).json({ success: false, message: 'invalid copy' });
    }

    if (!copy.available) {
      return res.status(400).json({ success: false, message: 'copy unavailable' });
    }

    const ownerId = copy.userId;

    if (ownerId === userId) {
      return res.status(400).json({ success: false, message: 'ownerId and userId cannot be the same' });
    }

    const swap = await models.Swap.findOne({
      where: { situation: ['A', 'I'] },
      include: [
        { model: models.SwapUser, where: { userId } },
        { model: models.SwapCopy, where: { copyId } }]
    });

    if (swap) {
      if (swap.situation === 'A') {
        return res.status(400).json({ success: false, message: 'user already has a pending request on this copy' });
      }

      if (swap.situation === 'I') {
        return res.status(400).json({ success: false, message: 'user already has an ongoing swap with this copy' });
      }
    }

    try {
      const swap = await models.Swap.create({
        category, expiresAt,
        swapcopy: { copyId },
        swapusers: { userId },
        situation: 'A'
      }, { include: [models.SwapCopy, models.SwapUser] });

      return res.json({
        success: true, message: 'registration successful', swapId: swap.id, userId, ownerId, copyId: copy.id
      });

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

  // @PUT # /api/swaps/:swapId/accept
  static async swapAccept(req, res) {

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'invalid authentication' });
    }

    const { error } = Joi.validate(req.params,
      {
        swapId: Joi.number().integer().required(),
      }
    );

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const swapId = req.params.swapId;
    const swap = await models.Swap.findOne({
      where: { id: swapId }, required: true,
      include: [
        { model: models.SwapUser, required: true }, {
          model: models.SwapCopy, required: true, include:
            { model: models.Copy, required: true }
        }]
    });

    if (!swap) {
      return res.status(400).json({ success: false, message: 'there is no swap with such id' });
    }

    if (userId != swap.swapcopy.copy.userId) {
      return res.status(400).json({ success: false, message: 'user is not the owner of the copy' });
    }

    if (swap.situation != 'A') {
      return res.status(400).json({ success: false, message: 'swap is not in pending situation (\'A\')' });
    }

    try {
      const newUser = await models.SwapUser.create({
        swapId, userId
      });

      const situation = 'I';

      await models.Swap.update({ situation }, { where: { id: swapId } });

      const acceptedSwap = await models.Swap.findOne({
        where: { id: swapId }, required: true,
        include: [
          { model: models.SwapUser, required: true }, {
            model: models.SwapCopy, required: true
          }]
      });

      return res.json({ sucess: true, message: 'swap accepted', acceptedSwap });

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

  // @PUT # /api/swaps/:swapId/cancel
  static async swapCancel(req, res) {

    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'invalid authentication' });
    }

    const { error } = Joi.validate(req.params,
      {
        swapId: Joi.number().integer().required(),
      }
    );

    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const swapId = req.params.swapId;
    const swap = await models.Swap.findOne({
      where: { id: swapId }, required: true,
      include: [
        { model: models.SwapUser, required: true }, {
          model: models.SwapCopy, required: true, include:
            { model: models.Copy, required: true }
        }]
    });

    if (!swap) {
      return res.status(400).json({ success: false, message: 'there is no swap with such id' });
    }

    if (userId != swap.swapusers[0].userId && userId != swap.swapcopy.copy.userId) {
      return res.status(400).json({ success: false, message: 'invalid user' });
    }

    if (swap.situation != 'A') {
      return res.status(400).json({ success: false, message: 'swap is not in pending situation (\'A\')' });
    }

    try {
      const situation = 'C';

      await models.Swap.update({ situation }, { where: { id: swapId } });

      return res.json({ success: true, message: 'swap cancelled', swapId, situation });

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

export default SwapController;
