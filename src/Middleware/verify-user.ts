import { NextFunction, Request, Response } from "express";
import auth from "../Utils/auth";
import { ForbiddenError, UnauthorizedError } from "../Models/errors-models";

async function isUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.header("authorization");
    const isValid = await auth.verifyToken(authHeader);
    if (!isValid) {
        next(new UnauthorizedError("You are not logged in"));
        return;
    }
}

async function verifyAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.header("authorization");
    // first verify the user
    isUser(req, res, next);

    // check the user's role
    const role = auth.getUserRoleFromToken(authHeader);
    if (role !== "admin") {
        next(new ForbiddenError("Forbidden"));
        return;
    }
    next();
}

export default { verifyAdmin };