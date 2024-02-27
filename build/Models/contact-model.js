"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var ContactModel = /** @class */ (function () {
    function ContactModel(contact) {
        this.from_name = "";
        this.subject = "";
        this.message = "";
        this.reply_to = "";
        this.from_name = contact.from_name;
        this.subject = contact.subject;
        this.message = contact.message;
        this.reply_to = contact.reply_to;
    }
    ContactModel.prototype.validate = function () {
        var _a;
        var result = ContactModel.validationScheme.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    ContactModel.validationScheme = joi_1.default.object({
        from_name: joi_1.default.string().required().min(2).max(50),
        subject: joi_1.default.string().required().min(2).max(50),
        reply_to: joi_1.default.string().email().required(),
        message: joi_1.default.string().required()
    });
    return ContactModel;
}());
exports.default = ContactModel;
