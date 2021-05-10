import { celebrate, Segments, Joi } from 'celebrate';
import TypeController from '@modules/types/infra/http/controllers/TypeController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

const typeRouter = Router();
const typeController = new TypeController();

typeRouter.use(ensureAuthenticated);

typeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  typeController.create,
);

// typeRouter.get('/', typeController.index);

// typeRouter.delete('/:id', typeController.destroy);

export default typeRouter;
