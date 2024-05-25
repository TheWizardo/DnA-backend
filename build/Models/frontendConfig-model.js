"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var FrontendConfig = /** @class */ (function () {
    function FrontendConfig(c) {
        this.addressBaseAPI = c.addressBaseAPI;
        this.audio_discounted_amount = c.audio_discounted_amount;
        this.audio_price = c.audio_price;
        this.citiesAPIsuffix = c.citiesAPIsuffix;
        this.epub_discounted_amount = c.epub_discounted_amount;
        this.epub_price = c.epub_price;
        this.max_physical = c.max_physical;
        this.local_phone = c.local_phone;
        this.international_phone = c.international_phone;
        this.pdf_discounted_amount = c.pdf_discounted_amount;
        this.pdf_price = c.pdf_price;
        this.physical_discounted_amount = c.physical_discounted_amount;
        this.physical_price = c.physical_price;
        this.shipment_cost = c.shipment_cost;
        this.shipment_cost_base = c.shipment_cost_base;
        this.showBanner = c.showBanner;
        this.streetsAPIsuffix = c.streetsAPIsuffix;
    }
    FrontendConfig.prototype.validate = function () {
        var _a;
        var result = FrontendConfig.validationScheme.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    FrontendConfig.validationScheme = joi_1.default.object({
        shipment_cost_base: joi_1.default.number().required().integer().positive(),
        physical_price: joi_1.default.number().required().integer().positive(),
        audio_price: joi_1.default.number().required().integer().positive(),
        epub_price: joi_1.default.number().required().integer().positive(),
        pdf_price: joi_1.default.number().required().integer().positive(),
        shipment_cost: joi_1.default.number().required().integer().positive().max(joi_1.default.ref('shipment_cost_base')),
        physical_discounted_amount: joi_1.default.number().required().integer().positive().max(joi_1.default.ref('physical_price')),
        audio_discounted_amount: joi_1.default.number().required().integer().positive().max(joi_1.default.ref('audio_price')),
        epub_discounted_amount: joi_1.default.number().required().integer().positive().max(joi_1.default.ref('epub_price')),
        pdf_discounted_amount: joi_1.default.number().required().integer().positive().max(joi_1.default.ref('pdf_price')),
        max_physical: joi_1.default.number().required().integer().positive().max(10),
        showBanner: joi_1.default.boolean().required(),
        addressBaseAPI: joi_1.default.string().required(),
        citiesAPIsuffix: joi_1.default.string().required(),
        streetsAPIsuffix: joi_1.default.string().required(),
        local_phone: joi_1.default.string().required(),
        international_phone: joi_1.default.string().required(),
    });
    return FrontendConfig;
}());
exports.default = FrontendConfig;
