import { IBaseRepository } from "../repositories/base.repository";
import { verifyEntity } from "../helpers/verify-entity.helper";

interface IBaseService {
  findById(id: string): Promise<any>;
  find(pageSize: number, pageNum: number): Promise<any>;
  create(entity: object): Promise<any>;
  update(id: string, entity: object): Promise<any>;
  delete(id: string): Promise<any>;
}

class BaseService implements IBaseService {
  private _repository: IBaseRepository;

  constructor(repository: IBaseRepository) {
    this._repository = repository;
    this.findById = this.findById.bind(this);
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async findById(id: string) {
    verifyEntity(id, { status: 400, message: "The id has not been sent" });

    const currentEntry = await this._repository.findById(id);

    verifyEntity(currentEntry, {
      status: 404,
      message: "Registry is not found",
    });

    return currentEntry;
  }

  async find(pageSize: number, pageNum: number) {
    return await this._repository.find(pageSize, pageNum);
  }

  async create(entity: object) {
    verifyEntity(entity, {
      status: 400,
      message: "The entity has not been sent",
    });

    return await this._repository.create(entity);
  }

  async update(id: string, entity: object) {
    verifyEntity(id, { status: 400, message: "The id has not been sent" });

    verifyEntity(entity, {
      status: 400,
      message: "The entity has not been sent",
    });

    return await this._repository.update(id, entity);
  }

  async delete(id: string) {
    verifyEntity(id, { status: 400, message: "The id has not been sent" });

    await this._repository.delete(id);
    return true;
  }
}

export { BaseService, IBaseService };
