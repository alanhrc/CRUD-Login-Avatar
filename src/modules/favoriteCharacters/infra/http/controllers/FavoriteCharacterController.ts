import CreateFavoriteCharacterService from '@modules/favoriteCharacters/services/CreateFavoriteCharacterService';
import DeleteFavoriteCharacterService from '@modules/favoriteCharacters/services/DeleteFavoriteCharacterService';
import ListFavoriteCharacterService from '@modules/favoriteCharacters/services/ListFavoriteCharacterService';
import ListFavoriteCharacterWithFilterService from '@modules/favoriteCharacters/services/ListFavoriteCharacterWithFilterService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FavoriteCharacterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      code,
      name,
      description,
      thumbnail_path,
      thumbnail_extension,
    } = request.body;

    const createFavoriteCharacterService = container.resolve(
      CreateFavoriteCharacterService,
    );

    const favoriteCharacter = await createFavoriteCharacterService.execute({
      user_id,
      code,
      name,
      description,
      thumbnail_path,
      thumbnail_extension,
    });

    return response.json(favoriteCharacter);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listFavoriteCharacterService = container.resolve(
      ListFavoriteCharacterService,
    );

    const favoriteCharacters = await listFavoriteCharacterService.execute({
      user_id,
    });

    return response.json(favoriteCharacters);
  }

  public async indexWithFilter(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { filter } = request.query;

    const listFavoriteCharacterWithFilterService = container.resolve(
      ListFavoriteCharacterWithFilterService,
    );

    const favoriteCharacters = await listFavoriteCharacterWithFilterService.execute(
      {
        user_id,
        filter: String(filter),
      },
    );

    return response.json(favoriteCharacters);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { code } = request.params;

    const deleteFavoriteCharacterService = container.resolve(
      DeleteFavoriteCharacterService,
    );

    const parseToIntCode = Number(code);

    await deleteFavoriteCharacterService.execute({
      user_id,
      code: parseToIntCode,
    });

    return response.json({
      message: 'Favorite character successfully removed ',
    });
  }
}
