import IFavoriteCharacterRepository from '@modules/favoriteCharacters/repositories/IFavoriteCharacterRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  code: number;
}

@injectable()
class DeleteFavoriteCharacterService {
  constructor(
    @inject('FavoriteCharacterRepository')
    private favoriteCharacterRepository: IFavoriteCharacterRepository,
  ) {}

  public async execute({ user_id, code }: IRequest): Promise<void> {
    const favoriteCharacterFound = await this.favoriteCharacterRepository.findByCode(
      user_id,
      code,
    );

    if (!favoriteCharacterFound) {
      throw new AppError('Favorite Character not found');
    }

    await this.favoriteCharacterRepository.destroy(user_id, code);
  }
}

export default DeleteFavoriteCharacterService;
