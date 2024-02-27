"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mostly for debugging
// logs incoming requests
function logger(req, res, next) {
    console.log("".concat(req.method, " ").concat(req.baseUrl + req.originalUrl));
    next();
}
exports.default = logger;
