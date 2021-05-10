import FavoriteCharacter from '@modules/favoriteCharacters/infra/typeorm/entities/FavoriteCharacter';
import IFavoriteCharacterRepository from '@modules/favoriteCharacters/repositories/IFavoriteCharacterRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  filter: string;
}

@injectable()
class ListFavoriteCharacterWithFilterService {
  constructor(
    @inject('FavoriteCharacterRepository')
    private favoriteCharacterRepository: IFavoriteCharacterRepository,
  ) {}

  public async execute({
    user_id,
    filter,
  }: IRequest): Promise<FavoriteCharacter[]> {
    const favoriteCharacters = await this.favoriteCharacterRepository.indexWithFilter(
      user_id,
      String(filter),
    );

    return favoriteCharacters;
  }
}

export default ListFavoriteCharacterWithFilterService;
