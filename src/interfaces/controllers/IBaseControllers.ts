export interface IBaseController<Request, Response> {
  handle(req: Request, res: Response): Promise<void>;
}