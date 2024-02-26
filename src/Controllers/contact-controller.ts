import express, { NextFunction, Request, Response } from "express";
import authLogic from "../Logic/auth-logic";
import ContactModel from "../Models/contact-model";
import contactLogic from "../Logic/contact-logic";

const router = express.Router();

router.post("/contact", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contact = new ContactModel(req.body);
        await contactLogic.contact(contact);
        res.sendStatus(201);
    }
    catch (err: any) {
        next({error: err, from: "ContactController-ContactMe"});
    }
});


export default router;