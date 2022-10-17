"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var auth_1 = require("./middlewares/auth");
var auth_2 = __importDefault(require("./partials/auth"));
var user_1 = __importDefault(require("./partials/user"));
function default_1(app) {
    app.use("/auth", auth_2["default"]);
    app.use("/api/users", auth_1.parseJWT, auth_1.validateJWT, user_1["default"]);
    app.use(function (err, req, res, next) {
        try {
            if (Object.prototype.hasOwnProperty.call(err, "status")) {
                return res.status(err.status || 500).send(err.message || err);
            }
            else {
                var parsedError = JSON.parse(err.message);
                return res.status(parsedError.status || 500).send(parsedError.message || err.message || "Unknown Error");
            }
        }
        catch (e) {
            return res.status(err.status || 500).send(err.message || err);
        }
    });
}
exports["default"] = default_1;
