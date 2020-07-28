import { helpService } from "../services";
import { Request, Response } from "express";

class HelpController {
  private _helpService: any;

  constructor(helpService: any) {
    this._helpService = helpService;
    this.get = this.get.bind(this);
  }

  get(req: Request, res: Response) {
    const index = this._helpService.index();

    res.status(200).json({
      code: 200,
      message: "Return index",
      data: index,
    });
  }
}

export default new HelpController(helpService);
