import ICreateFavoriteCharacterDTO from '@modules/favoriteCharacters/dtos/ICreateFavoriteCharacterDTO';
import FavoriteCharacter from '@modules/favoriteCharacters/infra/typeorm/entities/FavoriteCharacter';
import IFavoriteCharacterRepository from '@modules/favoriteCharacters/repositories/IFavoriteCharacterRepository';
import { uuid } from 'uuidv4';

class FakeFavoriteCharacterRepository implements IFavoriteCharacterRepository {
  private favoriteCharacters: FavoriteCharacter[] = [];

  public async create(
    data: ICreateFavoriteCharacterDTO,
  ): Promise<FavoriteCharacter> {
    const favoriteCharacter = new FavoriteCharacter();

    Object.assign(favoriteCharacter, { id: uuid() }, data);

    this.favoriteCharacters.push(favoriteCharacter);

    return favoriteCharacter;
  }

  public async index(user_id: string): Promise<FavoriteCharacter[]> {
    const findFavoriteCharacter = this.favoriteCharacters.filter(
      favoriteCharacter => favoriteCharacter.user_id === user_id,
    );

    return findFavoriteCharacter;
  }

  public async findByCode(
    user_id: string,
    code: number,
  ): Promise<FavoriteCharacter | undefined> {
    const findFavoriteCharacter = this.favoriteCharacters.find(
      favoriteCharacter =>
        favoriteCharacter.user_id === user_id &&
        favoriteCharacter.code === code,
    );

    return findFavoriteCharacter;
  }

  public async save(data: FavoriteCharacter): Promise<FavoriteCharacter> {
    const findIndex = this.favoriteCharacters.findIndex(
      favoriteCharacter => favoriteCharacter.code === data.code,
    );

    this.favoriteCharacters[findIndex] = data;

    return data;
  }

  public async indexWithFilter(
    user_id: string,
    filter: string,
  ): Promise<FavoriteCharacter[]> {
    const findFavoriteCharacter = this.favoriteCharacters.filter(
      favoriteCharacter =>
        favoriteCharacter.user_id === user_id &&
        favoriteCharacter.description.toUpperCase() ===
          filter.toUpperCase().trim(),
    );

    return findFavoriteCharacter;
  }

  public async destroy(user_id: string, code: number): Promise<void> {
    const findIndex = this.favoriteCharacters.findIndex(
      favoriteCharacter =>
        favoriteCharacter.user_id === user_id &&
        favoriteCharacter.code === code,
    );

    this.favoriteCharacters.splice(findIndex, 1);
  }
}

export default FakeFavoriteCharacterRepository;
