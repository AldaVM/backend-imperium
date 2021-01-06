import { BaseService } from "./base.service";
import { parameter, timetableRepository } from "../repositories";
import { TimetableRepository } from "repositories/timetable.repository";
import { parameterService } from "./parameter.service";

class TimetableService extends BaseService {
  private _timetableRepository: TimetableRepository;

  constructor(timetableRepository: any) {
    super(timetableRepository);
    this._timetableRepository = timetableRepository;
    this.addCustomer = this.addCustomer.bind(this);
    this.findShiftsAvailable = this.findShiftsAvailable.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.getTimetableAllDays = this.getTimetableAllDays.bind(this);
    this.addCustomerInDiaryTurn = this.addCustomerInDiaryTurn.bind(this);
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

  async addCustomerInDiaryTurn(idsTurn: [], idCustomer: object) {
    try {
      const customersRegister = idsTurn.map((idTurn) =>
        this.addCustomer(idTurn, idCustomer)
      );

      const timetablesUpdated = await Promise.all(customersRegister);

      return {
        ok: true,
        status: 200,
        message: "List record",
        data: timetablesUpdated,
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

  async getTimetableAllDays(class_shift: string) {
    try {
      const parameter: any = await parameterService.getValueByName("maxVacant");
      const maxVacant = parameter ? parseInt(parameter) - 1 : 7;

      const timetables: any = await this._timetableRepository.findByItems({
        class_shift,
        customerLength: { $gte: 0, $lte: maxVacant },
      });

      const timetablesRepeated = timetables.reduce(
        (acu: any, timetable: any) => {
          acu[timetable.hour] = {
            count: (acu[timetable.hour] ? 1 : 0 || 0) + 1,
            turns_id: (acu[timetable.hour]
              ? acu[timetable.hour].turns_id
              : [] || []
            ).concat([timetable._id]),
            class_shift: timetable.class_shift,
            customers: timetable.customers.length,
          };
          return acu;
        },
        {}
      );

      const availableTimetables = Object.entries(timetablesRepeated).reduce(
        (acu: any, item: any) => {
          if (item[1].count > 1) {
            acu.push({
              _id: item[0],
              hour: item[0],
              ...item[1],
              intermediate_days: "Diario",
            });
          }
          return acu;
        },
        []
      );

      if (availableTimetables.length == 0) {
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
        data: availableTimetables,
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
      const parameter: any = await parameterService.getValueByName("maxVacant");
      const maxVacant = parameter ? parseInt(parameter) - 1 : 7;

      const timetable: any = await this._timetableRepository.findShiftsAvailable(
        items,
        maxVacant
      );

      if (timetable.length == 0) {
        return {
          ok: true,
          status: 200,
          message:
            "No tenemos turnos disponibles en el horario seleccionado 😓",
        };
      }

      let record = timetable.map((currentValue: any) => {
        return {
          _id: currentValue._id,
          class_shift: currentValue.class_shift,
          intermediate_days: currentValue.intermediate_days,
          vacancies: currentValue.vacancies,
          hour: currentValue.hour,
          customer: currentValue.customers.length,
        };
      });

      return {
        ok: true,
        status: 200,
        message: "List record",
        data: record,
        size: record.length,
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
