import FakeFavoriteCharacterRepository from '@modules/favoriteCharacters/repositories/fakes/FakeFavoriteCharacterRepository';
import CreateFavoriteCharacterService from '@modules/favoriteCharacters/services/CreateFavoriteCharacterService';
import AppError from '@shared/errors/AppError';

let fakeFavoriteCharacterRepository: FakeFavoriteCharacterRepository;
let createFavoriteCharacterService: CreateFavoriteCharacterService;

describe('CreateFavoriteCharacter', () => {
  beforeEach(() => {
    fakeFavoriteCharacterRepository = new FakeFavoriteCharacterRepository();

    createFavoriteCharacterService = new CreateFavoriteCharacterService(
      fakeFavoriteCharacterRepository,
    );
  });

  it('should be able to create a new favorite character', async () => {
    const favoriteCharacter = await createFavoriteCharacterService.execute({
      user_id: 'qualquer',
      code: 1017100,
      name: 'A-Bomb (HAS)',
      description:
        "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
      thumbnail_extension:
        'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
      thumbnail_path: 'jpg',
    });

    expect(favoriteCharacter).toHaveProperty('id');
  });

  it('should not be able to create a new existent favorite character', async () => {
    const favoriteCharacter = await createFavoriteCharacterService.execute({
      user_id: 'qualquer',
      code: 1017100,
      name: 'A-Bomb (HAS)',
      description:
        "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
      thumbnail_extension:
        'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
      thumbnail_path: 'jpg',
    });

    await expect(
      createFavoriteCharacterService.execute({
        user_id: 'qualquer',
        code: favoriteCharacter.code,
        name: 'A-Bomb (HAS)',
        description:
          "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
        thumbnail_extension:
          'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
        thumbnail_path: 'jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
