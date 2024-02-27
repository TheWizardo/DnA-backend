"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceError = exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.RouteNotFound = exports.IdNotFound = exports.GeneralError = void 0;
var GeneralError = /** @class */ (function () {
    function GeneralError(status, message, from) {
        this.status = status;
        this.message = message;
        this.from = from;
    }
    return GeneralError;
}());
exports.GeneralError = GeneralError;
var IdNotFound = /** @class */ (function (_super) {
    __extends(IdNotFound, _super);
    function IdNotFound(id, from) {
        return _super.call(this, 404, "id ".concat(id, " not found"), from) || this;
    }
    return IdNotFound;
}(GeneralError));
exports.IdNotFound = IdNotFound;
var RouteNotFound = /** @class */ (function (_super) {
    __extends(RouteNotFound, _super);
    function RouteNotFound(route, from) {
        return _super.call(this, 404, "route ".concat(route, " not found"), from) || this;
    }
    return RouteNotFound;
}(GeneralError));
exports.RouteNotFound = RouteNotFound;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, from) {
        return _super.call(this, 400, message, from) || this;
    }
    return ValidationError;
}(GeneralError));
exports.ValidationError = ValidationError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message, from) {
        return _super.call(this, 401, message, from) || this;
    }
    return UnauthorizedError;
}(GeneralError));
exports.UnauthorizedError = UnauthorizedError;
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(message, from) {
        return _super.call(this, 403, message, from) || this;
    }
    return ForbiddenError;
}(GeneralError));
exports.ForbiddenError = ForbiddenError;
var ServiceError = /** @class */ (function (_super) {
    __extends(ServiceError, _super);
    function ServiceError(message, from) {
        return _super.call(this, 503, message, from) || this;
    }
    return ServiceError;
}(GeneralError));
exports.ServiceError = ServiceError;
