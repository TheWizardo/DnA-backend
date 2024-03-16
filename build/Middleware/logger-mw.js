"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mostly for debugging
// logs incoming requests
function logger(req, res, next) {
    var urlParts = (req.baseUrl + req.originalUrl).split("?");
    if (urlParts.length === 1) {
        console.log("".concat(req.method, " ").concat(urlParts[0]));
    }
    else {
        var url = [];
        for (var _i = 0, _a = urlParts[1].split("&"); _i < _a.length; _i++) {
            var u = _a[_i];
            if (!u.includes("privateKey")) {
                url.push(u);
            }
        }
        if (url.length === 0) {
            console.log("".concat(req.method, " ").concat(urlParts[0]));
        }
        else {
            console.log("".concat(req.method, " ").concat(urlParts[0], "?").concat(url.join("&")));
        }
    }
    next();
}
exports.default = logger;
