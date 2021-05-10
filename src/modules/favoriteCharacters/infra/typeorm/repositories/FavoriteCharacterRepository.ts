import ICreateFavoriteCharacterDTO from '@modules/favoriteCharacters/dtos/ICreateFavoriteCharacterDTO';
import FavoriteCharacter from '@modules/favoriteCharacters/infra/typeorm/entities/FavoriteCharacter';
import IFavoriteCharacterRepository from '@modules/favoriteCharacters/repositories/IFavoriteCharacterRepository';
import { getRepository, Like, Repository } from 'typeorm';

class FavoriteCharacterRepository implements IFavoriteCharacterRepository {
  private ormRepository: Repository<FavoriteCharacter>;

  constructor() {
    this.ormRepository = getRepository(FavoriteCharacter);
  }

  public async create(
    data: ICreateFavoriteCharacterDTO,
  ): Promise<FavoriteCharacter> {
    const favoriteCharacter = this.ormRepository.create(data);

    await this.ormRepository.save(favoriteCharacter);

    return favoriteCharacter;
  }

  public async save(
    data: ICreateFavoriteCharacterDTO,
  ): Promise<FavoriteCharacter> {
    const favoriteCharacter = await this.ormRepository.save(data);

    return favoriteCharacter;
  }

  public async index(user_id: string): Promise<FavoriteCharacter[]> {
    const favoriteCharacters = await this.ormRepository.find({
      where: { user_id },
      order: { name: 'ASC' },
    });

    return favoriteCharacters;
  }

  public async findByCode(
    user_id: string,
    code: number,
  ): Promise<FavoriteCharacter | undefined> {
    const favoriteCharacter = await this.ormRepository.findOne({
      where: { user_id, code },
    });

    return favoriteCharacter;
  }

  public async indexWithFilter(
    user_id: string,
    filter: string,
  ): Promise<FavoriteCharacter[]> {
    const favoriteCharacters = await this.ormRepository.find({
      where: [
        {
          user_id,
        },
        {
          name: Like(`%${filter}`),
        },
        {
          description: Like(`%${filter}%`),
        },
      ],
      order: { name: 'ASC' },
    });

    return favoriteCharacters;
  }

  public async destroy(user_id: string, code: number): Promise<void> {
    const favoriteCharacter = await this.ormRepository.findOne({
      where: { user_id, code },
    });

    if (favoriteCharacter) {
      await this.ormRepository.delete(favoriteCharacter.id);
    }
  }
}

export default FavoriteCharacterRepository;
