import { Model } from "mongoose";

interface IBaseRepository {
  findById(id: string): Promise<any>;
  find(pageSize: number, pageNum: number): Promise<any>;
  findByItems(items: object): Promise<any>;
  create(entity: object): Promise<any>;
  update(id: string, entity: object): Promise<any>;
  delete(id: string): Promise<any>;
}

class BaseRepository implements IBaseRepository {
  private _model: Model<any>;

  constructor(schemaModel: Model<any>) {
    this._model = schemaModel;
    this.findById = this.findById.bind(this);
    this.find = this.find.bind(this);
    this.findByItems = this.findByItems.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async findById(id: string) {
    return await this._model.findById(id);
  }

  async find(pageSize: number, pageNum: number) {
    const skips = pageSize * (pageNum - 1);
    const records = await this._model.find().skip(skips).limit(pageSize);
    const count = await this._model.countDocuments({});

    return {
      records,
      count,
    };
  }

  async findByItems(items: object) {
    const records = await this._model.find({ ...items }).exec();

    return records;
  }

  async create(entity: object) {
    const registry = new this._model(entity);
    return await registry.save();
  }

  async update(id: string, entity: object) {
    return await this._model.findByIdAndUpdate(id, entity, { new: true });
  }

  async delete(id: string) {
    return await this._model.findByIdAndDelete(id);
  }
}

export { IBaseRepository, BaseRepository };
