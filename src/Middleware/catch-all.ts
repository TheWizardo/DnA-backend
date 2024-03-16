import { NextFunction, Request, Response } from "express";
import config from "../Utils/config";

// catches all errors in the system and sends them as a response
function catchAll(err: any, req: Request, res: Response, next: NextFunction): void {
    try {
        console.log("error is:", err);
        const statusCode = err.status ? err.status : (err?.status ? err.status : 500);
        if (statusCode === 500 && config.environment === "production") {
            err.message = "Something went wrong..."
        }
        res.status(statusCode).send(extractErrorMessage(err));
    }
    catch(error: any) {
        console.log(error);
    }
}

function extractErrorMessage(err: any) {
    if (typeof err === "string") return err;
    if (typeof err?.error?.message === "string") return err.error.message;
    if (typeof err?.response?.data === "string") return err.response.data;
    if (Array.isArray(err?.response?.data)) return err.response.data[0];
    if (typeof err?.message === "string") return err.message;
    console.error("CatchAll", err);
    return "Oops...";
}

export default catchAll;