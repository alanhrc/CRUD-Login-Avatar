import favoriteCharacterRouter from '@modules/favoriteCharacters/infra/http/routes/favoriteCharacters.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profleRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profleRouter);

routes.use('/characters', favoriteCharacterRouter);

export default routes;
