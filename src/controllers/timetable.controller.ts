import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { timetableService } from "../services";
import { TimetableService } from "services/timetable.service";

class TimetableController extends BaseController {
  private _timetableService: TimetableService;

  constructor(timetableService: any) {
    super(timetableService);
    this._timetableService = timetableService;
    this.addCustomer = this.addCustomer.bind(this);
    this.findShiftsAvailable = this.findShiftsAvailable.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const timetable = await this._timetableService.deleteCustomer(
      id,
      body?.customer
    );

    res.status(timetable.status).json(timetable);
  }

  async addCustomer(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const timetable = await this._timetableService.addCustomer(id, body);

    res.status(timetable.status).json(timetable);
  }

  async findShiftsAvailable(req: Request, res: Response) {
    const { items } = req.body;

    const timetable = await this._timetableService.findShiftsAvailable(items);

    res.status(timetable.status).json(timetable);
  }
}

const timetableController = new TimetableController(timetableService);

export { timetableController, TimetableController };
