import { NextFunction, Request, Response } from "express";
import auth from "../Utils/auth";
import { UnauthorizedError, ValidationError } from "../Models/errors-models";

async function isUser(req: Request, res: Response, next: NextFunction): Promise<boolean> {
    const authHeader = req.header("authorization");
    const isValid = await auth.verifyToken(authHeader);
    if (!isValid) {
        next(new UnauthorizedError("You are not logged in", "VerifyUser-isUser"));
        return false;
    }
    return true
}

async function verifyAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    // first verify the user
    if (!await isUser(req, res, next)) return;

    const authHeader = req.header("authorization");
    // check the user's role
    if (!await auth.verifyToken(authHeader)) throw new ValidationError("Invalid Token", "VerifyAdmin");
    const role = auth.getUserRoleFromToken(authHeader);
    if (role !== "admin") {
        next(new UnauthorizedError("Unauthorized", "VerifyUser-verifyAdmin"));
        return;
    }
    next();
}

export default { verifyAdmin };