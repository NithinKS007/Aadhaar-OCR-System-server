import { Request, Response } from "express";
import { IBaseController } from "@interfaces/controllers/IBaseControllers";

export interface IControllers extends IBaseController<Request, Response> {}
