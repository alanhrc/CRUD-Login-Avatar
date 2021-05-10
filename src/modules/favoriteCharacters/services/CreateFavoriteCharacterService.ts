import FavoriteCharacter from '@modules/favoriteCharacters/infra/typeorm/entities/FavoriteCharacter';
import IFavoriteCharacterRepository from '@modules/favoriteCharacters/repositories/IFavoriteCharacterRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  code: number;
  name: string;
  description: string;
  thumbnail_path: string;
  thumbnail_extension: string;
}

@injectable()
class CreateFavoriteCharacterService {
  constructor(
    @inject('FavoriteCharacterRepository')
    private favoriteCharacterRepository: IFavoriteCharacterRepository,
  ) {}

  public async execute({
    user_id,
    code,
    name,
    description,
    thumbnail_path,
    thumbnail_extension,
  }: IRequest): Promise<FavoriteCharacter> {
    const existentProduct = await this.favoriteCharacterRepository.findByCode(
      user_id,
      code,
    );

    if (existentProduct) {
      throw new AppError('Character already add your favorites.');
    }

    const favoriteCharacter = await this.favoriteCharacterRepository.create({
      user_id,
      code,
      name,
      description,
      thumbnail_extension,
      thumbnail_path,
    });

    return favoriteCharacter;
  }
}

export default CreateFavoriteCharacterService;
