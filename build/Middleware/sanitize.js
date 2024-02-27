"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var striptags_1 = __importDefault(require("striptags"));
function sanitize(req, res, next) {
    for (var _i = 0, _a = req.body; _i < _a.length; _i++) {
        var prop = _a[_i];
        if (typeof req.body[prop] === "string") {
            req.body[prop] = (0, striptags_1.default)(req.body[prop]);
        }
    }
    next();
}
exports.default = sanitize;
