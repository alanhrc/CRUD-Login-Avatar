import ICreateFavoriteCharacterDTO from '@modules/favoriteCharacters/dtos/ICreateFavoriteCharacterDTO';
import FavoriteCharacter from '@modules/favoriteCharacters/infra/typeorm/entities/FavoriteCharacter';

export default interface IFavoriteCharacterRepository {
  create(data: ICreateFavoriteCharacterDTO): Promise<FavoriteCharacter>;
  index(user_id: string): Promise<FavoriteCharacter[]>;
  findByCode(
    user_id: string,
    code: number,
  ): Promise<FavoriteCharacter | undefined>;
  save(data: ICreateFavoriteCharacterDTO): Promise<FavoriteCharacter>;
  indexWithFilter(
    user_id: string,
    filter: string,
  ): Promise<FavoriteCharacter[]>;
  destroy(user_id: string, code: number): Promise<void>;
}
