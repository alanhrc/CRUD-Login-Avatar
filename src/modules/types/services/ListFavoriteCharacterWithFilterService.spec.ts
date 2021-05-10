import FakeFavoriteCharacterRepository from '@modules/favoriteCharacters/repositories/fakes/FakeFavoriteCharacterRepository';
import ListFavoriteCharacterWithFilterService from '@modules/favoriteCharacters/services/ListFavoriteCharacterWithFilterService';

let fakeFavoriteCharacterRepository: FakeFavoriteCharacterRepository;
let listFavoriteCharacterWithFilterService: ListFavoriteCharacterWithFilterService;

describe('ListFavoriteCharacterWithFilterService', () => {
  beforeEach(() => {
    fakeFavoriteCharacterRepository = new FakeFavoriteCharacterRepository();

    listFavoriteCharacterWithFilterService = new ListFavoriteCharacterWithFilterService(
      fakeFavoriteCharacterRepository,
    );
  });

  it('should be able to list a favorite character with filter', async () => {
    const favoriteCharacter = await fakeFavoriteCharacterRepository.create({
      user_id: 'qualquer',
      code: 1017100,
      name: 'A-Bomb (HAS)',
      description:
        "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
      thumbnail_extension:
        'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
      thumbnail_path: 'jpg',
    });

    const favoriteCharacters = await listFavoriteCharacterWithFilterService.execute(
      {
        user_id: favoriteCharacter.user_id,
        filter:
          "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
      },
    );

    expect(favoriteCharacters).toEqual([favoriteCharacter]);
  });
});
