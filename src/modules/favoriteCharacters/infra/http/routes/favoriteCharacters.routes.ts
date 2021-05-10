// import { celebrate, Segments, Joi } from 'celebrate';
import FavoriteCharacterController from '@modules/favoriteCharacters/infra/http/controllers/FavoriteCharacterController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

const favoriteCharacterRouter = Router();
const favoriteCharacterController = new FavoriteCharacterController();

favoriteCharacterRouter.use(ensureAuthenticated);

favoriteCharacterRouter.post('/', favoriteCharacterController.create);

favoriteCharacterRouter.get('/', favoriteCharacterController.index);

favoriteCharacterRouter.post(
  '/filter',
  favoriteCharacterController.indexWithFilter,
);

favoriteCharacterRouter.delete('/:code', favoriteCharacterController.destroy);

export default favoriteCharacterRouter;
