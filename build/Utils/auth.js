"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secretKey = "LionsAndTigersAndBears";
function generateNewToken(user) {
    var container = { user: user };
    // signing a new token for the given user
    var token = jsonwebtoken_1.default.sign(container, secretKey, { expiresIn: "3h" });
    return token;
}
function verifyToken(authHeader) {
    return new Promise(function (res, rej) {
        try {
            // request doesn't include token
            if (!authHeader) {
                res(false);
                return;
            }
            // getting only the token => 'Bearer XXXX...'
            var token = authHeader.substring(7);
            if (!token) {
                res(false);
                return;
            }
            // verifying token is correct and valid 
            jsonwebtoken_1.default.verify(token, secretKey, function (err) {
                if (err) {
                    res(false);
                    return;
                }
                res(true);
                return;
            });
        }
        catch (err) {
            rej(err);
        }
    });
}
function getUserRoleFromToken(authHeader) {
    if (!authHeader)
        return;
    var token = authHeader.substring(7);
    // extracting user from token
    var container = jsonwebtoken_1.default.decode(token);
    var user = container.user;
    return user.role;
}
exports.default = { generateNewToken: generateNewToken, verifyToken: verifyToken, getUserRoleFromToken: getUserRoleFromToken };
