"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = __importDefault(require("../Utils/dal"));
var errors_models_1 = require("../Models/errors-models");
var config_1 = __importDefault(require("../Utils/config"));
var encryptionService_1 = __importDefault(require("../Services/encryptionService"));
var uuid_1 = require("uuid");
var conditionService_1 = __importDefault(require("../Services/conditionService"));
function getAllCoupons(shouldStrip) {
    if (shouldStrip === void 0) { shouldStrip = false; }
    return __awaiter(this, void 0, void 0, function () {
        var raw_text, coupons;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dal_1.default.readString(config_1.default.couponsEndpoint)];
                case 1:
                    raw_text = _a.sent();
                    coupons = JSON.parse(raw_text);
                    if (shouldStrip)
                        return [2 /*return*/, stripSha(coupons)];
                    return [2 /*return*/, coupons];
            }
        });
    });
}
// %2F => /
// %2B => +
// %3D => =
function getCoupon(couponCode, order) {
    return __awaiter(this, void 0, void 0, function () {
        var allCoupons, allCouponsBut, selectedCoupon, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllCoupons()];
                case 1:
                    allCoupons = _a.sent();
                    allCouponsBut = allCoupons.filter(function (c) { return encryptionService_1.default.sha256(couponCode) !== extractSha(c); });
                    // making sure we have that coupon
                    if (allCoupons.length === allCouponsBut.length) {
                        throw new errors_models_1.IdNotFound(couponCode, "CouponLogic-getCoupon");
                    }
                    selectedCoupon = allCoupons.filter(function (c) { return encryptionService_1.default.sha256(couponCode) === extractSha(c); })[0];
                    error = conditionService_1.default.validateCouponConditions(selectedCoupon, order);
                    if (error)
                        throw new errors_models_1.ValidationError(error, "couponLogic-getCoupon");
                    delete selectedCoupon.code;
                    return [2 /*return*/, selectedCoupon];
            }
        });
    });
}
function deleteCoupon(couponId) {
    return __awaiter(this, void 0, void 0, function () {
        var allCoupons, allCouponsBut;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllCoupons()];
                case 1:
                    allCoupons = _a.sent();
                    allCouponsBut = allCoupons.filter(function (c) { return c.id !== couponId; });
                    // making sure we have that coupon
                    if (allCoupons.length === allCouponsBut.length) {
                        throw new errors_models_1.IdNotFound(couponId, "CouponLogic-deleteCoupon");
                    }
                    return [4 /*yield*/, dal_1.default.writeFile(config_1.default.couponsEndpoint, JSON.stringify(allCouponsBut))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateCoupon(couponId, coupon) {
    return __awaiter(this, void 0, void 0, function () {
        var error, allCoupons, allCouponsBut, filtered;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = coupon.validate();
                    if (error)
                        throw new errors_models_1.ValidationError(error, "CouponLogic-updateCoupon");
                    return [4 /*yield*/, getAllCoupons()];
                case 1:
                    allCoupons = _a.sent();
                    allCouponsBut = allCoupons.filter(function (c) { return c.id !== couponId; });
                    // making sure we have that coupon
                    if (allCoupons.length === allCouponsBut.length) {
                        throw new errors_models_1.IdNotFound(couponId, "CouponLogic-updateCoupon");
                    }
                    filtered = allCoupons.filter(function (c) { return encryptionService_1.default.sha256(c.code) === extractSha(c); });
                    if (filtered.length > 0) {
                        throw new errors_models_1.ForbiddenError("Cannot have two coupons with the same name.", "CouponLogic-updateCoupon");
                    }
                    coupon.code = encryptionService_1.default.rsaEncrypt(coupon.code) + encryptionService_1.default.sha256(coupon.code);
                    allCouponsBut.push(coupon);
                    return [4 /*yield*/, dal_1.default.writeFile(config_1.default.couponsEndpoint, JSON.stringify(allCouponsBut))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, coupon];
            }
        });
    });
}
function addCoupon(coupon) {
    return __awaiter(this, void 0, void 0, function () {
        var error, allCoupons, filtered;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // verifying given coupon
                    coupon.id = (0, uuid_1.v4)();
                    error = coupon.validate();
                    if (error)
                        throw new errors_models_1.ValidationError(error, "CouponLogic-addCoupon");
                    return [4 /*yield*/, getAllCoupons()];
                case 1:
                    allCoupons = _a.sent();
                    filtered = allCoupons.filter(function (c) { return encryptionService_1.default.sha256(coupon.code) === extractSha(c); });
                    if (filtered.length > 0) {
                        throw new errors_models_1.ForbiddenError("Cannot add two coupons with the same code. Were you trying to edit?", "CouponLogic-addCoupon");
                    }
                    coupon.code = encryptionService_1.default.rsaEncrypt(coupon.code) + encryptionService_1.default.sha256(coupon.code);
                    allCoupons.push(coupon);
                    return [4 /*yield*/, dal_1.default.writeFile(config_1.default.couponsEndpoint, JSON.stringify(allCoupons))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, coupon];
            }
        });
    });
}
function stripSha(coupons) {
    return coupons.map(function (c) { c.code = c.code.slice(0, c.code.length - 64); return c; });
}
function extractSha(coupon) {
    return coupon.code.slice(coupon.code.length - 64);
}
exports.default = {
    getAllCoupons: getAllCoupons,
    getCoupon: getCoupon,
    deleteCoupon: deleteCoupon,
    updateCoupon: updateCoupon,
    addCoupon: addCoupon
};
