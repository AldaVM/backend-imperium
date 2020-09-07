import { BaseService } from "./base.service";
import { timetableRepository, customerRepository } from "../repositories";
import { TimetableRepository } from "repositories/timetable.repository";

class TimetableService extends BaseService {
  private _timetableRepository: TimetableRepository;

  constructor(timetableRepository: any) {
    super(timetableRepository);
    this._timetableRepository = timetableRepository;
    this.addCustomer = this.addCustomer.bind(this);
    this.findShiftsAvailable = this.findShiftsAvailable.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  async deleteCustomer(id: string, idCustomer: string) {
    try {
      const timetable: any = await this._timetableRepository.findById(id);
      const customers = timetable.customers.filter(
        (customer: any) => customer._id != idCustomer
      );
      const updatedTimetabled = await this._timetableRepository.update(id, {
        customers,
        customerLength: customers.length,
      });

      return {
        ok: true,
        status: 200,
        message: "List record",
        data: updatedTimetabled,
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

  async addCustomer(id: string, idCustomer: object) {
    try {
      const timetable: any = await this._timetableRepository.findById(id);

      timetable.customers.push(idCustomer);
      timetable.customerLength = timetable.customers.length;

      const currentTimetable = await this._timetableRepository.update(
        id,
        timetable
      );

      return {
        ok: true,
        status: 200,
        message: "List record",
        data: currentTimetable,
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

  async findShiftsAvailable(items: object) {
    try {
      const timetable: any = await this._timetableRepository.findShiftsAvailable(
        items
      );

      if (timetable.length == 0) {
        return {
          ok: true,
          status: 200,
          message:
            "No tenemos turnos disponibles en el horario seleccionado 😓",
        };
      }

      return {
        ok: true,
        status: 200,
        message: "List record",
        data: timetable,
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
}

const timetableService = new TimetableService(timetableRepository);

export { timetableService, TimetableService };
