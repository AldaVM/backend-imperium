import { IBaseService } from "../services/base.service";
import { Request, Response } from "express";

class BaseController {
  private _service: IBaseService;

  constructor(service: IBaseService) {
    this._service = service;
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const record = await this._service.findById(id);

    res.status(200).json({
      code: 200,
      message: "Record list",
      data: record,
    });
  }

  async find(req: Request, res: Response) {
    const { pageSize, pageNum } = req.query;

    let size = pageSize ? +pageSize : 5,
      page = pageNum ? +pageNum : 1;

    const records = await this._service.find(size, page);

    res.status(200).json({
      status: 200,
      message: "List records",
      data: records,
    });
  }

  async create(req: Request, res: Response) {
    const { body } = req;

    const record = await this._service.create(body);

    res.status(200).json({
      status: 200,
      message: "New record inserted",
      data: record,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const record = await this._service.update(id, body);

    res.status(200).json({
      status: 200,
      message: "Record updated",
      data: record,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const record = await this._service.delete(id);

    res.status(200).json({
      status: 200,
      message: "Record deleted",
      data: record,
    });
  }
}

export { BaseController };
