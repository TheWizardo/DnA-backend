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
// import sslController from './Controllers/ssl-controller';
var config_controller_1 = __importDefault(require("./Controllers/config-controller"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var cors_1 = __importDefault(require("cors"));
var logger_mw_1 = __importDefault(require("./Middleware/logger-mw"));
var config_1 = __importDefault(require("./Utils/config"));
var sanitize_1 = __importDefault(require("./Middleware/sanitize"));
// import https from 'https';
var http_1 = __importDefault(require("http"));
// import fs from 'fs';
var server = (0, express_1.default)();
// const sslChallenge = express()
server.use((0, cors_1.default)());
// sslChallenge.use(cors());
server.use("/", (0, express_rate_limit_1.default)({ windowMs: 500, max: 20, message: "Please try again later" }));
// sslChallenge.use("/", expressRateLimit({ windowMs: 500, max: 20, message: "Please try again later" }));
server.use(express_1.default.json());
server.use(sanitize_1.default);
server.use(logger_mw_1.default); ///////////////////////////////////////////////////////////////////////////////////////////////
server.use("/api/v1", auth_controller_1.default);
server.use("/api/v1", images_controller_1.default);
server.use("/api/v1", coupons_controller_1.default);
server.use("/api/v1", contact_controller_1.default);
server.use("/api/v1", orders_controller_1.default);
server.use("/api/v1", config_controller_1.default);
server.use("*", route_not_found_1.default);
server.use(catch_all_1.default);
// sslChallenge.use("/", sslController);
// sslChallenge.use("*", routeNotFound);
// sslChallenge.use(catchAll);
// const sslCreds = {
//     key: fs.readFileSync(`${config.certFilesPath}privkey.pem`, "utf-8"),
//     cert: fs.readFileSync(`${config.certFilesPath}fullchain.pem`, "utf-8"),
// }
// https.createServer(sslCreds, server).listen(config.httpsPort, () => console.log(`Listening on port ${config.httpsPort}`));
// http.createServer(sslChallenge).listen(config.httpPort, () => console.log(`Listening for the acme challenge on port ${config.httpPort}`));
http_1.default.createServer(server).listen(config_1.default.httpsPort, function () { return console.log("Listening on port ".concat(config_1.default.httpsPort)); });
