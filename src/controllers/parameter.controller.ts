import { BaseController } from "./base.controller";
import { parameterService } from "../services";
import { ParameterService } from "services/parameter.service";

class ParameterController extends BaseController {
  private _parameterService: ParameterService;

  constructor(parameterService: any) {
    super(parameterService);
    this._parameterService = parameterService;
  }
}

const parameterController = new ParameterController(parameterService);

export { parameterController, ParameterController };
