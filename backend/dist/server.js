"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.run = void 0;
var routes_1 = __importDefault(require("./routes"));
var express_1 = __importDefault(require("express"));
var debug_1 = __importDefault(require("debug"));
var fs_1 = require("fs");
var http_1 = require("http");
var https_1 = require("https");
var engines = __importStar(require("consolidate"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var app = (0, express_1["default"])();
var APP_PORT = process.env.APP_PORT || 3030;
var log = (0, debug_1["default"])("app:main");
var httpLog = (0, debug_1["default"])("app:endpoint");
var users_1 = __importDefault(require("./helpers/users"));
app.use((0, cookie_parser_1["default"])(process.env.APP_SECRET));
app.engine("html", engines.ejs);
app.set("view engine", "ejs");
app.set("views", path_1["default"].join(__dirname, "../", "frontend"));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "../", "frontend")));
app.use(express_1["default"].urlencoded({
    "extended": true,
    "limit": "3mb"
}));
app.use(express_1["default"].json());
if (httpLog.enabled) {
    app.use((0, morgan_1["default"])("combined", {
        "stream": {
            "write": function (msg) { return httpLog(msg.trimEnd()); }
        }
    }));
}
function run(CUSTOM_APP_PORT, skipAdminAdd) {
    if (CUSTOM_APP_PORT === void 0) { CUSTOM_APP_PORT = 0; }
    if (skipAdminAdd === void 0) { skipAdminAdd = false; }
    return __awaiter(this, void 0, void 0, function () {
        var server, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.LOCAL_HTTPS) {
                        server = (0, https_1.createServer)({
                            "key": (0, fs_1.readFileSync)(path_1["default"].join(__dirname, "..", "certificates/local/localhost-privkey.pem")),
                            "cert": (0, fs_1.readFileSync)(path_1["default"].join(__dirname, "..", "certificates/local/localhost-cert.pem")),
                            "rejectUnauthorized": false
                        }, app);
                    }
                    else {
                        server = (0, http_1.createServer)(app);
                    }
                    log("".concat(process.env.LOCAL_HTTPS ? "HTTPS" : "HTTP", " server created"));
                    if (!!skipAdminAdd) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, users_1["default"].createUser(process.env.ADMIN_USER || "admin", process.env.ADMIN_PASSWORD || "admin123")];
                case 2:
                    _a.sent();
                    log("Default admin user created.");
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    log("Default admin already exists.");
                    return [3 /*break*/, 4];
                case 4:
                    server.listen(CUSTOM_APP_PORT || APP_PORT, function () {
                        (0, routes_1["default"])(app);
                        log("Server started at port: ".concat(CUSTOM_APP_PORT || APP_PORT));
                    });
                    return [2 /*return*/, server];
            }
        });
    });
}
exports.run = run;
