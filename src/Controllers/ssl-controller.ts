import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../Models/credentials-model";
import authLogic from "../Logic/auth-logic";

const router = express.Router();

router.get("/.well-known/acme-challenge/tK-o0XbpHmyyWC6Qdsxnmo9LFIL-PDwinvEvB2JS8es", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json("tK-o0XbpHmyyWC6Qdsxnmo9LFIL-PDwinvEvB2JS8es.X3LI0yNz6RaPBAKgF_ilMA05U7-OlFkeXwqviR_Vzuw");
    }
    catch (err: any) {
        next({error: err, from: "AuthController-Login"});
    }
});


export default router;