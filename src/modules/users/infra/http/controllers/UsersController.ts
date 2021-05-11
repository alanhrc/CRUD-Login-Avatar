import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { secret, name, email, password, type, status } = request.body;

    const createUser = container.resolve(CreateUserService);

    if (!secret) {
      const userLoggedId = request.user.id;

      const user = await createUser.execute({
        userLoggedId,
        name,
        email,
        password,
        type,
        status,
      });

      return response.json(classToClass(user));
    }

    const user = await createUser.execute({
      name,
      email,
      password,
      type,
      status,
    });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const userLoggedId = request.user.id;

    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute({
      userLoggedId,
    });

    return response.json(classToClass(users));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userLoggedId = request.user.id;
    const user_id = request.params;
    const { name, email, type, status, password } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      userLoggedId,
      user_id: String(user_id),
      name,
      email,
      type,
      status,
      password,
    });

    return response.json(classToClass(user));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userLoggedId = request.user.id;
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ userLoggedId, id });

    return response.json({ message: 'User successfully deleted.' });
  }
}
