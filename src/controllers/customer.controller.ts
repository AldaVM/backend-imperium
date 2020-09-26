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

    const data = await this._customerService.find(100, 1);
    const clients = data?.data?.records.reduce(
      (acu: any, currentValue: any) => {
        if (currentValue?.timetable) {
          acu.push({
            created: format(currentValue.create_at, "dd/MM/yyyy"),
            register_timetable: format(
              currentValue.date_timetable,
              "dd/MM/yyyy"
            ),
            ...currentValue?._doc,
            is_shift: "sí",
            ...currentValue?.timetable?._doc,
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
