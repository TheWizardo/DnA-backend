import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../Models/credentials-model";
import authLogic from "../Logic/auth-logic";

const router = express.Router();

router.get("/.well-known/acme-challenge/O3edbkKb_QHT7hXSttgdbutO2eB824oSaev-LHzjoXk", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json("O3edbkKb_QHT7hXSttgdbutO2eB824oSaev-LHzjoXk.X3LI0yNz6RaPBAKgF_ilMA05U7-OlFkeXwqviR_Vzuw");
    }
    catch (err: any) {
        next({error: err, from: "AuthController-Login"});
    }
});


export default router;