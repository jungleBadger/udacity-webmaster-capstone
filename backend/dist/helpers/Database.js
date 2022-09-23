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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var debug_1 = __importDefault(require("debug"));
var sequelize_1 = require("sequelize");
var log = (0, debug_1["default"])("app:helpers:database");
var Joi = __importStar(require("joi"));
var dbSchema = Joi.object({
    "dialect": Joi.alternatives()["try"]("mysql", "mariadb", "postgres", "mssql"),
    "database": Joi.string().required(),
    "host": Joi.string().required(),
    "username": Joi.string().required(),
    "password": Joi.string().required(),
    "port": Joi.number().integer().allow(null),
    "dialectOptions": Joi.object().allow(null),
    "pool": Joi.object().allow(null),
    "logging": Joi["function"]().allow(false).allow(null)
});
var Database = /** @class */ (function () {
    /**
     * Constructs new Database instance using the provided connection info.
     *
     * @constructor
     * @param {string} dbType - Type of the database to be created.
     * @param {Object} dbConnectionInfo - The instance's URL.
     * @param {string} dbConnectionInfo.username - The instance's username.
     * @param {string} dbConnectionInfo.password - The instance's password.
     */
    function Database(dbType, dbConnectionInfo) {
        /**
         * Hold the valid Data types
         *
         * @memberOf Database
         * @public
         */
        this.DataTypes = sequelize_1.DataTypes;
        /**
         * Hold the valid Operators
         *
         * @memberOf Database
         * @public
         */
        this.Op = sequelize_1.Op;
        if (!dbType || !dbConnectionInfo) {
            throw new Error(JSON.stringify({
                "status": 400,
                "message": "Invalid DB configuration."
            }));
        }
        this.Client = this.buildConnection(dbType, dbConnectionInfo);
    }
    /**
     * Create a new Database instance using the provided connection info returning a Sequelize instance.
     *
     * @memberOf Database
     * @private
     * @param {string} dbType - Type of the database to be created.
     * @param {Object} dbConnectionInfo - The instance's URL.
     * @param {string} dbConnectionInfo.database - The instance's database.
     * @param {string} dbConnectionInfo.password - The instance's password.
     * @param {string} dbConnectionInfo.host - The instance's host URL.
     * @param {number} dbConnectionInfo.port - The instance's port.
     * @param {string} [dbConnectionInfo.b64Certificate] - The instance's base 64 certificate.
     * @return {Sequelize} A Sequelize instance {@see https://sequelize.org/master/}
     */
    Database.prototype.buildConnection = function (dbType, dbConnectionInfo) {
        var schema = dbSchema.validate({
            "database": dbConnectionInfo.database,
            "username": dbConnectionInfo.username,
            "password": dbConnectionInfo.password,
            "host": dbConnectionInfo.host,
            "port": dbConnectionInfo.port || null,
            "dialect": dbType,
            "dialectOptions": {
                "ssl": dbConnectionInfo.b64Certificate ? {
                    "ca": Buffer.from(dbConnectionInfo.b64Certificate, "base64").toString("ascii")
                } : null
            },
            "pool": {
                "max": 5,
                "min": 0,
                "idle": 10000
            },
            "logging": (Object.prototype.hasOwnProperty.call(dbConnectionInfo, "logging") ?
                dbConnectionInfo.logging :
                (function (msg) { return log(msg); }))
        });
        if (schema.error) {
            throw new Error(JSON.stringify({
                "status": 400,
                "message": schema.error.message
            }));
        }
        return new sequelize_1.Sequelize(schema.value);
    };
    return Database;
}());
exports["default"] = Database;
