import { NextFunction, Request, Response } from "express";

export const validate =
  () => (_req: Request, _res: Response, next: NextFunction) => {
    next();
  };
