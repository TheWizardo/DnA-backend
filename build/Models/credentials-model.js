"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var CredentialsModel = /** @class */ (function () {
    function CredentialsModel(user) {
        this.username = user.username;
        this.password = user.password;
    }
    CredentialsModel.prototype.validate = function () {
        var _a;
        var result = CredentialsModel.validationScheme.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    CredentialsModel.validationScheme = joi_1.default.object({
        username: joi_1.default.string().required().min(4).max(100),
        password: joi_1.default.string().required().min(4).max(100),
    });
    return CredentialsModel;
}());
exports.default = CredentialsModel;
