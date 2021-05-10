import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuthenticated);

usersRouter.post(
  '/',
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

usersRouter.get('/', usersController.index);

usersRouter.delete('/:id', usersController.destroy);

export default usersRouter;
