"use strict";
exports.__esModule = true;
exports.userModel = exports.TABLE_REFERENCE = void 0;
var sequelize_1 = require("sequelize");
exports.TABLE_REFERENCE = "user";
function userModel() {
    return {
        "id": {
            "type": sequelize_1.DataTypes.NUMBER,
            "autoIncrement": true,
            "primaryKey": true
        },
        "username": {
            "type": sequelize_1.DataTypes.TEXT,
            "unique": true
        },
        "password": {
            "type": sequelize_1.DataTypes.TEXT,
            "notNull": true
        },
        "createdAt": {
            "type": sequelize_1.DataTypes.DATE,
            "field": "createdAt"
        },
        "updatedAt": {
            "type": sequelize_1.DataTypes.DATE,
            "field": "updatedAt"
        }
    };
}
exports.userModel = userModel;
