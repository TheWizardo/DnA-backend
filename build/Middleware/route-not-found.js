"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_models_1 = require("../Models/errors-models");
function routeNotFound(req, res, next) {
    throw new errors_models_1.RouteNotFound(req.originalUrl, "RouteNotFound-routeNotFound");
}
exports.default = routeNotFound;
