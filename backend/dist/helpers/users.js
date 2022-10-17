"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var User_1 = require("../models/User");
var security_1 = require("./security");
var Database_1 = __importDefault(require("./Database"));
var sequelizeTableConfig_1 = __importDefault(require("../configs/sequelizeTableConfig"));
var DB_PREFIX = (process.env.NODE_ENV || "").toLowerCase() === "test" ? "TEST_" : "";
var dbObject = new Database_1["default"]("postgres", {
    "database": process.env["".concat(DB_PREFIX, "POSTGRES_DB")],
    "username": process.env["".concat(DB_PREFIX, "POSTGRES_USER")],
    "password": process.env["".concat(DB_PREFIX, "POSTGRES_PASSWORD")],
    "host": process.env["".concat(DB_PREFIX, "POSTGRES_HOST_URL")],
    "port": process.env["".concat(DB_PREFIX, "POSTGRES_PORT")]
});
exports["default"] = {
    "User": dbObject.Client.define(User_1.TABLE_REFERENCE, (0, User_1.userModel)(), sequelizeTableConfig_1["default"]),
    /**
     * Creates a new User.
     * @method createUser
     * @async
     * @param {string} username - User's unique name - a sort of nickname.
     * @param {string} rawPassword - User's raw password - this will be converted to a hash.
     * @return {Promise<User|Error>} Containing the created User object.
     */
    "createUser": function (username, rawPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, e_1;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!username || !rawPassword) {
                            throw new Error(JSON.stringify({
                                "status": 400,
                                "message": "Missing User properties."
                            }));
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 4, , 5]);
                        _b = (_a = this.User).create;
                        _d = {
                            "username": username
                        };
                        _c = "password";
                        return [4 /*yield*/, (0, security_1.generateHash)(rawPassword)];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_d[_c] = _e.sent(),
                                _d)])];
                    case 3: return [2 /*return*/, (_e.sent()).toJSON()];
                    case 4:
                        e_1 = _e.sent();
                        if (e_1.name === "SequelizeUniqueConstraintError") {
                            throw new Error(JSON.stringify({
                                "status": 409,
                                "message": "User ".concat(username, " already exists.")
                            }));
                        }
                        else {
                            throw e_1;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Retrieves a single User object based on a query.
     * @method retrieveUserInfo
     * @async
     * @param {object} query - Query object to fetch User through ID or username.
     * @param {boolean} [includePassword=false] - Include User's hashed password into the result object.
     * @param {boolean} [acceptNotFound=false] - Define if the code should emit an error if no entries are found.
     * @return {Promise<User|null|Error>} Object containing the User object.
     */
    "retrieveUserInfo": function (query, includePassword, acceptNotFound) {
        if (includePassword === void 0) { includePassword = false; }
        if (acceptNotFound === void 0) { acceptNotFound = false; }
        return __awaiter(this, void 0, void 0, function () {
            var userObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!query || (!query.id && !query.username)) {
                            throw new Error(JSON.stringify({
                                "status": 400,
                                "message": "Invalid query options."
                            }));
                        }
                        return [4 /*yield*/, this.User.findOne({
                                "attributes": includePassword ? { "exclude": [] } : { "exclude": ["password"] },
                                "where": query
                            })];
                    case 1:
                        userObject = _a.sent();
                        if (userObject) {
                            return [2 /*return*/, userObject.toJSON()];
                        }
                        else {
                            if (!acceptNotFound) {
                                throw new Error(JSON.stringify({
                                    "status": 404,
                                    "message": "User ".concat(query.id || query.username, " not found.")
                                }));
                            }
                            else {
                                return [2 /*return*/, null];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Create a JWT string upon user authentication.
     * @method authorizeUser
     * @async
     * @param {string} username - User's unique name - a sort of nickname.
     * @param {string} rawPassword - User's raw password - this will be compared against the stored hash.
     * @return {Promise<String|Error>} JWT string representing the User object and permissions.
     */
    "authorizeUser": function (username, rawPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var userObject, isPasswordValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username || !rawPassword) {
                            throw new Error(JSON.stringify({
                                "status": 400,
                                "message": "Missing parameters to authorize user."
                            }));
                        }
                        return [4 /*yield*/, this.retrieveUserInfo({
                                username: username
                            }, true, false)];
                    case 1:
                        userObject = _a.sent();
                        return [4 /*yield*/, (0, security_1.compareHash)(rawPassword, userObject === null || userObject === void 0 ? void 0 : userObject.password)];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, security_1.generateJWT)(__assign(__assign({}, userObject), { "password": undefined }), process.env.APP_SECRET, {
                                "expiresIn": "5 minutes"
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: throw new Error(JSON.stringify({
                        "status": 401,
                        "message": "Incorrect credentials. Modify it, and try again."
                    }));
                }
            });
        });
    }
};
