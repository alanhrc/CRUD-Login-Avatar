import ICreateTypeDTO from '@modules/types/dtos/ICreateTypeDTO';
import Type from '@modules/types/infra/typeorm/entities/Type';

export default interface ITypeRepository {
  findByType(type: string): Promise<Type | undefined>;
  create(data: ICreateTypeDTO): Promise<Type>;
  index(): Promise<Type[]>;
  save(data: ICreateTypeDTO): Promise<Type>;
  destroy(type: string): Promise<void>;
}
