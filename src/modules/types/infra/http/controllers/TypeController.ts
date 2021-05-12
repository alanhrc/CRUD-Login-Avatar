import CreateTypeService from '@modules/types/services/CreateTypeService';
import DeleteTypeService from '@modules/types/services/DeleteTypeService';
import ListTypesService from '@modules/types/services/ListTypesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FavoriteCharacterController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { type, description } = request.body;

    const createTypeService = container.resolve(CreateTypeService);

    const newType = await createTypeService.execute({
      user_id,
      type,
      description,
    });

    return response.json(newType);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listTypesService = container.resolve(ListTypesService);

    const types = await listTypesService.execute({
      user_id,
    });

    return response.json(types);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { typeId } = request.params;

    const deleteTypeService = container.resolve(DeleteTypeService);

    await deleteTypeService.execute({
      user_id,
      typeId,
    });

    return response.json({
      message: 'Type successfully removed ',
    });
  }
}
