import { NextFunction, Request, Response } from "express"
import { RouteNotFound } from "../Models/errors-models"

function routeNotFound(req: Request, res: Response, next: NextFunction): void {
    throw new RouteNotFound(req.originalUrl, "RouteNotFound-routeNotFound");
}

export default routeNotFound