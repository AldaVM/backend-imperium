import { BaseService } from "./base.service";
import { timetableRepository } from "../repositories";

class TimetableService extends BaseService {
  constructor(timetableRepository: any) {
    super(timetableRepository);
  }
}

const timetableService = new TimetableService(timetableRepository);

export { timetableService, TimetableService };
