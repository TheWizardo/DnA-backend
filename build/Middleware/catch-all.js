"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../Utils/config"));
// catches all errors in the system and sends them as a response
function catchAll(err, req, res, next) {
    try {
        console.log("error is:", err);
        var statusCode = err.status ? err.status : ((err === null || err === void 0 ? void 0 : err.status) ? err.status : 500);
        if (statusCode === 500 && config_1.default.environment === "production") {
            err.message = "Something went wrong...";
        }
        res.status(statusCode).send(extractErrorMessage(err));
    }
    catch (error) {
        console.log(error);
    }
}
function extractErrorMessage(err) {
    var _a, _b, _c;
    if (typeof err === "string")
        return err;
    if (typeof ((_a = err === null || err === void 0 ? void 0 : err.error) === null || _a === void 0 ? void 0 : _a.message) === "string")
        return err.error.message;
    if (typeof ((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.data) === "string")
        return err.response.data;
    if (Array.isArray((_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data))
        return err.response.data[0];
    if (typeof (err === null || err === void 0 ? void 0 : err.message) === "string")
        return err.message;
    console.error("CatchAll", err);
    return "Oops...";
}
exports.default = catchAll;
