"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var Config = /** @class */ (function () {
    function Config() {
        this.environment = process.env.NODE_ENV; //"development" || "production";
        this.port = +process.env.PORT || 3001;
        this.dataFolder = path_1.default.resolve(__dirname, "..", "Assets", "data");
        this.imagesFolder = path_1.default.resolve(__dirname, "..", "Assets", "images");
        this.ordersEndpoint = this.dataFolder + "/orders.json";
        this.couponsEndpoint = this.dataFolder + "/coupons.json";
        this.usersEndpoint = this.dataFolder + "/users.json";
        this.certFilesPath = "/etc/letsencrypt/live/api.demonsandangels.co.il/";
        this.EmailJs = "https://api.emailjs.com/api/v1.0/email/send";
        this.EmailJsUserId = "OEjoskM3upjjVzDsH";
        this.EmailJsServiceId = "demons-and-angels";
        this.EmailJsContactTemplateId = "template_cfhtu6q";
        this.EmailJsPurchaseTemplateId = "template_dw1mwas";
    }
    return Config;
}());
var config = new Config();
exports.default = config;
