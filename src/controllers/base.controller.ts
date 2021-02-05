import { IBaseService } from "../services/base.service";
import { Request, Response } from "express";

class BaseController {
  private _service: IBaseService;

  constructor(service: IBaseService) {
    this._service = service;
    this.findById = this.findById.bind(this);
    this.find = this.find.bind(this);
    this.findByItems = this.findByItems.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.findByItemsPagination = this.findByItemsPagination.bind(this);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const record = await this._service.findById(id);

    res.status(record.status).json(record);
  }

  async find(req: Request, res: Response) {
    const { pageSize, pageNum } = req.query;

    let size = pageSize ? +pageSize : 30,
      page = pageNum ? +pageNum : 1;

    const records = await this._service.find(size, page);

    res.status(records.status).json(records);
  }

  async findByItemsPagination(req: Request, res: Response) {
    const { pageSize, pageNum } = req.query;
    let size = pageSize ? +pageSize : 30,
      page = pageNum ? +pageNum : 1;

    const { items } = req.body;

    const record = await this._service.findByItemsPagination(items, size, page);

    res.status(record.status).json(record);
  }

  async findByItems(req: Request, res: Response) {
    const { items } = req.body;

    const record = await this._service.findByItems(items);

    res.status(record.status).json(record);
  }

  async create(req: Request, res: Response) {
    const { body } = req;

    const record = await this._service.create(body);

    res.status(record.status).json(record);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const record = await this._service.update(id, body);

    res.status(record.status).json(record);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const record = await this._service.delete(id);

    res.status(record.status).json(record);
  }
}

export { BaseController };
