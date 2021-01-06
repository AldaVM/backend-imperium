import { BaseService } from "./base.service";
import { parameter } from "../repositories";
import { ParameterRepository } from "../repositories/parameter.repositroy";

class ParameterService extends BaseService {
  private _parameterRepository: ParameterRepository;

  constructor(parameterRepository: any) {
    super(parameterRepository);
    this._parameterRepository = parameterRepository;
    this.getValueByName = this.getValueByName.bind(this);
  }

  async getValueByName(name: string) {
    try {
      const parameter: any = await this._parameterRepository.findByItems({
        name: name,
      });

      if (parameter.length < 0) {
        return null;
      }
      return parameter[0].value;
    } catch (error) {
      return null;
    }
  }
}

const parameterService = new ParameterService(parameter);

export { parameterService, ParameterService };
