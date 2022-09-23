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
        while (_) try {
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
exports.__esModule = true;
exports.compareHash = exports.generateHash = exports.validateJWT = exports.generateJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
/**
 * Generates a JWT applying app configs
 * @method generateJWT
 * @param {string|Buffer|object} rawData - Raw data to build the JWT.
 * @param {string} [secret] - Token to sign the secret, defaults to APP_SECRET env.
 * @param {object} [options] - Token options. {@see https://tools.ietf.org/html/rfc7519#section-4.1}
 * @return {Promise<string|Error>} Containing the hashed token.
 */
function generateJWT(rawData, secret, options) {
    if (rawData === void 0) { rawData = {}; }
    if (secret === void 0) { secret = ""; }
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        var callbackFn = function (err, token) {
            return err ? reject(err) : resolve(token);
        };
        (0, jsonwebtoken_1.sign)(rawData, (secret || process.env.APP_SECRET), options, callbackFn);
    });
}
exports.generateJWT = generateJWT;
/**
 * Validates an app generated JWT
 * @method validateJWT
 * @param {string} token - Hashed string to be checked.
 * @param {string} [secret] - Token to sign the secret, defaults to APP_SECRET env.
 * @param {object} [options={}] - Token options. {@see https://tools.ietf.org/html/rfc7519#section-4.1}
 * @throws Will throw a `400 - bad request` if required params are missing.
 * @throws Will throw a `401 - unauthorized` if the token validation fails.
 * @throws Will throw a `422 - unprocessable entity` if the token string is malformed.
 * @return {Promise<object|Error>} Containing the result of comparison
 */
function validateJWT(token, secret, options) {
    if (secret === void 0) { secret = ""; }
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        if (!token || (!secret && !process.env.APP_SECRET)) {
            return reject({
                "status": 400,
                "message": "Invalid params."
            });
        }
        var verifyCBFunction = function (err, decoded) {
            if (!err) {
                return resolve(decoded);
            }
            else if (err === "invalid algorithm" || err === "jwt malformed") {
                return reject({
                    "status": 422,
                    "message": "Error parsing token."
                });
            }
            else {
                return reject({
                    "status": 401,
                    "message": "Unauthorized call."
                });
            }
        };
        (0, jsonwebtoken_1.verify)(token, (secret || process.env.APP_SECRET), options, verifyCBFunction);
    });
}
exports.validateJWT = validateJWT;
/**
 * Generates a Hash from a given data.
 * @method generateHash
 * @param {string|Buffer} rawData - Raw data to be hashed.
 * @param {number} [customRounds=10] - Token to sign the secret, defaults to APP_SECRET env.
 * @return {Promise<string|Error>} Containing the hashed token.
 */
function generateHash(rawData, customRounds) {
    if (customRounds === void 0) { customRounds = 10; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, bcrypt_1.hash)(rawData, customRounds)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.generateHash = generateHash;
/**
 * Compares raw data with a previously generated hash.
 * @method compareHash
 * @param {string|Buffer} rawData - Raw data to be compared.
 * @param {string} hash - Previously hashed password to be compared.
 * @return {Promise<Boolean|Error>} Containing the hashed token.
 */
function compareHash(rawData, hash) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, bcrypt_1.compare)(rawData, hash)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.compareHash = compareHash;
