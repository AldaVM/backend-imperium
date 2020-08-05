import { BaseController } from "./base.controller";
import { timetableService } from "../services";

class TimetableController extends BaseController {
  constructor(timetableService: any) {
    super(timetableService);
  }
}

const timetableController = new TimetableController(timetableService);

export { timetableController, TimetableController };
