import express, { NextFunction, Request, Response } from "express";
import config from "../Utils/config";
import imagesLogic from "../Logic/images-logic";

const router = express.Router();

router.get("/images/:name", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fileName = req.params.name;

        const requestedFilePath = `${config.imagesFolder}/${fileName}`;
        const filePath = await imagesLogic.getFilePath(requestedFilePath);
        res.sendFile(filePath);
    }
    catch (err: any) {
        next({error: err, from: "ImagesController-GetImage"});
    }
});

export default router;