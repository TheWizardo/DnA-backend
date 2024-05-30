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
var express_1 = __importDefault(require("express"));
var verify_user_1 = __importDefault(require("../Middleware/verify-user"));
var config_logic_1 = __importDefault(require("../Logic/config-logic"));
var frontendConfig_model_1 = __importDefault(require("../Models/frontendConfig-model"));
var router = express_1.default.Router();
router.get("/config", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var config, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, config_logic_1.default.getConfig()];
            case 1:
                config = _a.sent();
                res.json(config);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next({ error: err_1, from: "ConfigController-GetConfig" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put("/config", verify_user_1.default.verifyAdmin, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var frontConf, conf, err_2;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0:
                _p.trys.push([0, 2, , 3]);
                req.body.shipment_cost_base = +req.body.shipment_cost_base;
                req.body.physical_price = +req.body.physical_price;
                req.body.audio_price = +((_a = req.body) === null || _a === void 0 ? void 0 : _a.audio_price);
                req.body.epub_price = +((_b = req.body) === null || _b === void 0 ? void 0 : _b.epub_price);
                req.body.pdf_price = +((_c = req.body) === null || _c === void 0 ? void 0 : _c.pdf_price);
                req.body.shipment_cost = +((_d = req.body) === null || _d === void 0 ? void 0 : _d.shipment_cost);
                req.body.physical_discounted_amount = +((_e = req.body) === null || _e === void 0 ? void 0 : _e.physical_discounted_amount);
                req.body.audio_discounted_amount = +((_f = req.body) === null || _f === void 0 ? void 0 : _f.audio_discounted_amount);
                req.body.epub_discounted_amount = +((_g = req.body) === null || _g === void 0 ? void 0 : _g.epub_discounted_amount);
                req.body.pdf_discounted_amount = +((_h = req.body) === null || _h === void 0 ? void 0 : _h.pdf_discounted_amount);
                req.body.max_physical = +((_j = req.body) === null || _j === void 0 ? void 0 : _j.max_physical);
                req.body.audio_price = +((_k = req.body) === null || _k === void 0 ? void 0 : _k.audio_price);
                req.body.audio_price = +((_l = req.body) === null || _l === void 0 ? void 0 : _l.audio_price);
                req.body.showBanner = ((_m = req.body) === null || _m === void 0 ? void 0 : _m.showBanner) || ((_o = req.body) === null || _o === void 0 ? void 0 : _o.showBanner) === "true" ? true : false;
                frontConf = new frontendConfig_model_1.default(req.body);
                return [4 /*yield*/, config_logic_1.default.updateConfig(frontConf)];
            case 1:
                conf = _p.sent();
                res.json(conf);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _p.sent();
                next({ error: err_2, from: "ConfigController-UpdateConfig" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
