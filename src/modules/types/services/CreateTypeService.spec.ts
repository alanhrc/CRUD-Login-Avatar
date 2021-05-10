// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTypeRepository from '@modules/types/repositories/fakes/FakeTypeRepository';
import CreateTypeService from '@modules/types/services/CreateTypeService';

let fakeUsersRepository: FakeUsersRepository;
let fakeTypeRepository: FakeTypeRepository;
let createTypeService: CreateTypeService;

describe('CreateType', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTypeRepository = new FakeTypeRepository();

    createTypeService = new CreateTypeService(
      fakeUsersRepository,
      fakeTypeRepository,
    );
  });

  it('should be able to create a new type', async () => {
    const userAdmin = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan2@alan.com',
      password: '123123',
      type: 'root',
      status: 'active',
    });

    const newType = await createTypeService.execute({
      user_id: userAdmin.id,
      type: 'root',
      description: 'Admin master application',
    });

    expect(newType).toHaveProperty('id');
  });

  // it('should not be able to create a new existent favorite character', async () => {
  //   const favoriteCharacter = await createFavoriteCharacterService.execute({
  //     user_id: 'qualquer',
  //     code: 1017100,
  //     name: 'A-Bomb (HAS)',
  //     description:
  //       "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
  //     thumbnail_extension:
  //       'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
  //     thumbnail_path: 'jpg',
  //   });

  //   await expect(
  //     createFavoriteCharacterService.execute({
  //       user_id: 'qualquer',
  //       code: favoriteCharacter.code,
  //       name: 'A-Bomb (HAS)',
  //       description:
  //         "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
  //       thumbnail_extension:
  //         'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
  //       thumbnail_path: 'jpg',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
