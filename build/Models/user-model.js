"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var UserModel = /** @class */ (function () {
    function UserModel(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }
    UserModel.prototype.validate = function () {
        var _a;
        var result = UserModel.validationScheme.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    UserModel.validationScheme = joi_1.default.object({
        id: joi_1.default.number().optional().positive().integer(),
        firstName: joi_1.default.string().required().min(2).max(100),
        lastName: joi_1.default.string().required().min(2).max(100),
        username: joi_1.default.string().required().min(4).max(100),
        password: joi_1.default.string().required().min(4).max(100),
        role: joi_1.default.string().optional()
    });
    return UserModel;
}());
exports.default = UserModel;
