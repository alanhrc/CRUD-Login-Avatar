import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userLoggedId = request.user.id;
    const { name, email, password, type, status } = request.body;

    const createUser = container.resolve(CreateUserService);

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

  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute();

    return response.json(classToClass(users));
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
