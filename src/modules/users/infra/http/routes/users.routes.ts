import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/secret',
  celebrate({
    [Segments.BODY]: {
      secret: Joi.string(),
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      type: Joi.string().required(),
      status: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      type: Joi.string().required(),
      status: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/', ensureAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      type: Joi.string().required(),
      status: Joi.string().required(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  usersController.update,
);

usersRouter.delete('/:id', ensureAuthenticated, usersController.destroy);

export default usersRouter;
