import { BaseController } from "./base.controller";
import { customerService } from "../services";
import { Request, Response } from "express";
import { CustomerServices } from "services/customer.service";
import { json2xlsx } from "../helpers";
const { format } = require("date-fns");

class CustomerController extends BaseController {
  private _customerService: CustomerServices;

  constructor(customerService: any) {
    super(customerService);
    this._customerService = customerService;
    this.validateShiftByDNI = this.validateShiftByDNI.bind(this);
    this.deleteTimetable = this.deleteTimetable.bind(this);
    this.downloadExcel = this.downloadExcel.bind(this);
    this.find = this.find.bind(this);
  }

  async find(req: Request, res: Response) {
    const records = await this._customerService.find(150, 1);

    res.status(records.status).json(records);
  }

  async validateShiftByDNI(req: Request, res: Response) {
    const { dni } = req.params;

    const record = await this._customerService.validateShiftByDNI(dni);

    res.status(record.status).json(record);
  }

  async deleteTimetable(req: Request, res: Response) {
    const { id } = req.params;

    const record = await this._customerService.deleteTimetable(id);

    res.status(record.status).json(record);
  }

  async downloadExcel(req: Request, res: Response) {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "clients.xlsx"
    );

    const getTimetable = (timetables: any) => {
      if (timetables.length > 1) {
        return {
          is_shift: "sí",
          class_shift: timetables[0].class_shift,
          type_turn: "Diario",
          intermediate_days: "Diario",
          hour: timetables[0].hour,
        };
      } else if (timetables.length === 1) {
        return {
          is_shift: "sí",
          class_shift: timetables[0].class_shift,
          type_turn: "Interdiario",
          intermediate_days: timetables[0].intermediate_days,
          hour: timetables[0].hour,
        };
      }

      return {
        is_shift: "no",
        class_shift: "-",
        type_turn: "-",
        intermediate_days: "-",
        register_timetable: "-",
        hour: "-",
      };
    };

    const data = await this._customerService.find(100, 1);
    const clients = data?.data?.records.reduce(
      (acu: any, currentValue: any) => {
        if (currentValue?.timetable) {
          console.log(currentValue?.timetable);
          acu.push({
            created: format(currentValue?.create_at, "dd/MM/yyyy"),
            ...getTimetable(currentValue?.timetable),
            register_timetable: format(
              currentValue?.date_timetable,
              "dd/MM/yyyy"
            ),
            ...currentValue?._doc,
          });
        } else {
          acu.push({
            created: format(currentValue.create_at, "dd/MM/yyyy"),
            ...currentValue?._doc,
            is_shift: "no",
          });
        }
        return acu;
      },
      []
    );

    const columnsClients = [
      { header: "ID", key: "_id" },
      { header: "Nombres", key: "names" },
      { header: "Apellidos", key: "surnames" },
      { header: "DNI", key: "dni" },
      { header: "DNI", key: "dni" },
      { header: "Fecha-Creación", key: "created" },
      { header: "Dirección", key: "address" },
      { header: "Email", key: "email" },
      { header: "Cumpleaños", key: "birthday" },
      { header: "Genero", key: "gender" },
      { header: "Celular", key: "phone_number" },
      { header: "En turno", key: "is_shift" },
      { header: "Tipo Turno", key: "class_shift" },
      { header: "Frecuencia", key: "intermediate_days" },
      { header: "Hora", key: "hour" },
      { header: "Fecha-Registro-Turno", key: "register_timetable" },
      { header: "Modalidad", key: "type_modality" },
      { header: "Turno descripción", key: "type_timetable" },
    ];

    const workbook = json2xlsx(clients, "clients", columnsClients);
    return workbook.xlsx
      .write(res)
      .then(function () {
        res.status(200).end();
      })
      .catch((error: any) =>
        res.status(500).json({
          message: "error",
          error,
        })
      );
  }
}

const customerController = new CustomerController(customerService);

export { customerController, CustomerController };
