"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var catch_all_1 = __importDefault(require("./Middleware/catch-all"));
var route_not_found_1 = __importDefault(require("./Middleware/route-not-found"));
var auth_controller_1 = __importDefault(require("./Controllers/auth-controller"));
var images_controller_1 = __importDefault(require("./Controllers/images-controller"));
var coupons_controller_1 = __importDefault(require("./Controllers/coupons-controller"));
var contact_controller_1 = __importDefault(require("./Controllers/contact-controller"));
var orders_controller_1 = __importDefault(require("./Controllers/orders-controller"));
var ssl_controller_1 = __importDefault(require("./Controllers/ssl-controller"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var cors_1 = __importDefault(require("cors"));
var logger_mw_1 = __importDefault(require("./Middleware/logger-mw"));
var config_1 = __importDefault(require("./Utils/config"));
var sanitize_1 = __importDefault(require("./Middleware/sanitize"));
var server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use("/", (0, express_rate_limit_1.default)({ windowMs: 500, max: 20, message: "Please try again later" }));
server.use(express_1.default.json());
server.use(sanitize_1.default);
server.use(logger_mw_1.default); ///////////////////////////////////////////////////////////////////////////////////////////////
server.use("/api/v1", auth_controller_1.default);
server.use("/api/v1", images_controller_1.default);
server.use("/api/v1", coupons_controller_1.default);
server.use("/api/v1", contact_controller_1.default);
server.use("/api/v1", orders_controller_1.default);
server.use("/", ssl_controller_1.default);
server.use("*", route_not_found_1.default);
server.use(catch_all_1.default);
server.listen(config_1.default.port, function () { return console.log("Listening on http://localhost:".concat(config_1.default.port)); });
