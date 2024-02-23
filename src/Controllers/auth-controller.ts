import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../Models/credentials-model";
import authLogic from "../Logic/auth-logic";

const router = express.Router();

router.post("/auth/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cred = new CredentialsModel(req.body);
        const token = await authLogic.login(cred);
        res.json(token);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;