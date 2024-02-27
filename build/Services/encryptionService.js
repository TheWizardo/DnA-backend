"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var node_rsa_1 = __importDefault(require("node-rsa"));
var errors_models_1 = require("../Models/errors-models");
var EncryptionService = /** @class */ (function () {
    function EncryptionService() {
        this.salt = "YellowBrickRoad";
        // const key = new RSA({ b: 512 });
        this.publicKey = new node_rsa_1.default("MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALxfysYh0X/jP08OTeExIdT1n4BPTjkGycQ+FFq7cRmJziv3TjVvnVj7nXqAVqhDS5KTJHzTnc44lnoYP9h2FicCAwEAAQ==", "public");
    }
    EncryptionService.prototype.sha256 = function (plainText) {
        if (!plainText)
            return null;
        return crypto_1.default.createHmac("sha256", this.salt).update(plainText).digest("hex");
    };
    EncryptionService.prototype.rsaEncrypt = function (plainText) {
        if (!plainText)
            return null;
        return this.publicKey.encrypt(plainText, "base64");
    };
    EncryptionService.prototype.rsaDecrypt = function (cipherText, key) {
        try {
            var privateKey = new node_rsa_1.default(key, "private");
            if (!cipherText)
                return null;
            return privateKey.decrypt(cipherText, "utf8");
        }
        catch (e) {
            throw new errors_models_1.UnauthorizedError("Encryption failed", "EncryptionService-rsaDecrypt");
        }
    };
    return EncryptionService;
}());
var encryptionService = new EncryptionService();
exports.default = encryptionService;
