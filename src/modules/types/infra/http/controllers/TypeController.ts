import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTypeService from '@modules/types/services/CreateTypeService';
// import DeleteFavoriteCharacterService from '@modules/favoriteCharacters/services/DeleteFavoriteCharacterService';
// import ListFavoriteCharacterService from '@modules/favoriteCharacters/services/ListFavoriteCharacterService';
// import ListFavoriteCharacterWithFilterService from '@modules/favoriteCharacters/services/ListFavoriteCharacterWithFilterService';

export default class FavoriteCharacterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { type, description } = request.body;

    const createTypeService = container.resolve(CreateTypeService);

    const newType = await createTypeService.execute({
      user_id,
      type,
      description,
    });

    return response.json(newType);
  }

  // public async index(request: Request, response: Response): Promise<Response> {
  //   const user_id = request.user.id;

  //   const listFavoriteCharacterService = container.resolve(
  //     ListFavoriteCharacterService,
  //   );

  //   const favoriteCharacters = await listFavoriteCharacterService.execute({
  //     user_id,
  //   });

  //   return response.json(favoriteCharacters);
  // }

  // public async indexWithFilter(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const user_id = request.user.id;
  //   const { filter } = request.query;

  //   const listFavoriteCharacterWithFilterService = container.resolve(
  //     ListFavoriteCharacterWithFilterService,
  //   );

  //   const favoriteCharacters = await listFavoriteCharacterWithFilterService.execute(
  //     {
  //       user_id,
  //       filter: String(filter),
  //     },
  //   );

  //   return response.json(favoriteCharacters);
  // }

  // public async destroy(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {
  //   const user_id = request.user.id;
  //   const { code } = request.params;

  //   const deleteFavoriteCharacterService = container.resolve(
  //     DeleteFavoriteCharacterService,
  //   );

  //   const parseToIntCode = Number(code);

  //   await deleteFavoriteCharacterService.execute({
  //     user_id,
  //     code: parseToIntCode,
  //   });

  //   return response.json({
  //     message: 'Favorite character successfully removed ',
  //   });
  // }
}
