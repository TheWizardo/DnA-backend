import { NextFunction, Request, Response } from "express";
import auth from "../Utils/auth";
import { UnauthorizedError } from "../Models/errors-models";

async function isUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.header("authorization");
    const isValid = await auth.verifyToken(authHeader);
    if (!isValid) {
        next(new UnauthorizedError("You are not logged in", "VerifyUser-isUser"));
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
        next(new UnauthorizedError("Unauthorized", "VerifyUser-verifyAdmin"));
        return;
    }
    next();
}

export default { verifyAdmin };