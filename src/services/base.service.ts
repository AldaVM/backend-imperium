import { IBaseRepository } from "../repositories/base.repository";

interface IBaseService {
  findById(id: string): Promise<any>;
  find(pageSize: number, pageNum: number): Promise<any>;
  findByItems(items: object): Promise<any>;
  findByItemsPagination(
    items: object,
    pageSize: number,
    pageNum: number
  ): Promise<any>;
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
    this.findByItems = this.findByItems.bind(this);
    this.findByItemsPagination = this.findByItemsPagination.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async findById(id: string) {
    try {
      const currentEntry = await this._repository.findById(id);

      return {
        ok: true,
        status: 200,
        message: "List record",
        data: currentEntry,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error,
      };
    }
  }

  async find(pageSize: number, pageNum: number) {
    try {
      const records = await this._repository.find(pageSize, pageNum);

      return {
        ok: true,
        status: 200,
        message: "List records",
        data: records,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error,
      };
    }
  }

  async findByItemsPagination(
    items: object,
    pageSize: number,
    pageNum: number
  ) {
    try {
      const { records, count } = await this._repository.findByItemsPagination(
        { ...items },
        pageSize,
        pageNum
      );

      return records.length > 0
        ? {
            ok: true,
            status: 200,
            message: "List record",
            data: records,
            count: count,
          }
        : {
            ok: false,
            status: 404,
            message: "Datos no encontrados",
            data: records,
          };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error,
      };
    }
  }

  async findByItems(items: object) {
    try {
      const records = await this._repository.findByItems({ ...items });

      return records.length > 0
        ? {
            ok: true,
            status: 200,
            message: "List record",
            data: records,
          }
        : {
            ok: false,
            status: 404,
            message: "Datos no encontrados",
            data: records,
          };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error,
      };
    }
  }

  async create(entity: object) {
    try {
      const newRecord = await this._repository.create(entity);

      return {
        ok: true,
        status: 201,
        message: "Insert new record",
        data: newRecord,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error,
      };
    }
  }

  async update(id: string, entity: object) {
    try {
      const updatedRecord = await this._repository.update(id, entity);

      return {
        ok: true,
        status: 200,
        message: "Update record",
        data: updatedRecord,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error,
      };
    }
  }

  async delete(id: string) {
    try {
      const record = await this._repository.delete(id);

      return {
        ok: true,
        status: 200,
        message: "Try deleted record",
        deleted: record ? true : false,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        data: error,
      };
    }
  }
}

export { BaseService, IBaseService };
