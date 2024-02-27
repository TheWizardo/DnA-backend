"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../Utils/config"));
// catches all errors in the system and sends them as a response
function catchAll(err, req, res, next) {
    var _a, _b;
    console.log("error is:", err);
    var statusCode = err.status ? err.status : (((_a = err.error) === null || _a === void 0 ? void 0 : _a.status) ? err.error.status : 500);
    if (statusCode === 500 && config_1.default.environment === "production") {
        err.error.message = "Something went wrong...";
    }
    res.status(statusCode).send((_b = err.error) === null || _b === void 0 ? void 0 : _b.message);
}
function extractErrorMessage(err) {
    var _a, _b;
    if (typeof err === "string")
        return err;
    if (typeof ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === "string")
        return err.response.data;
    if (Array.isArray((_b = err.response) === null || _b === void 0 ? void 0 : _b.data))
        return err.response.data[0];
    if (typeof err.message === "string")
        return err.message;
    console.error(err);
    return "Oops...";
}
exports.default = catchAll;
