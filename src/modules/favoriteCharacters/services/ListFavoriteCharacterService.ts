import FavoriteCharacter from '@modules/favoriteCharacters/infra/typeorm/entities/FavoriteCharacter';
import IFavoriteCharacterRepository from '@modules/favoriteCharacters/repositories/IFavoriteCharacterRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}

@injectable()
class ListFavoriteCharacterService {
  constructor(
    @inject('FavoriteCharacterRepository')
    private favoriteCharacterRepository: IFavoriteCharacterRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<FavoriteCharacter[]> {
    const favoriteCharacters = await this.favoriteCharacterRepository.index(
      user_id,
    );

    return favoriteCharacters;
  }
}

export default ListFavoriteCharacterService;
