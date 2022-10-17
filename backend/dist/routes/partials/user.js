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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var users_1 = __importDefault(require("../../helpers/users"));
var router = (0, express_1.Router)();
/**
 * @swagger
 * /api/users/create:
 *   get:
 *     tags: [Users]
 *     summary: Creates a new user.
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: firstName
 *        in: body
 *        required: true
 *        description: The User's first name.
 *        schema:
 *          type: string
 *      - name: lastName
 *        in: body
 *        required: true
 *        description: The User's last name.
 *        schema:
 *          type: string
 *      - name: password
 *        in: body
 *        required: true
 *        description: The User's raw password.
 *        schema:
 *          type: string
 *     responses:
 *       201:
 *         description: User created.
 *       401:
 *         description: Invalid API token.
 *       403:
 *         description: Expired or denied API token.
 *       409:
 *         description: User already exists.
 *       500:
 *         description: Error handler.
 */
router.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res.status(201)).send;
                return [4 /*yield*/, users_1["default"].createUser(req.body.username, req.body.rawPassword || req.body.password)];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
// /**
//  * @swagger
//  * /api/users/
//  *   get:
//  *     tags: [Users]
//  *     summary: List all available users.
//  *     security:
//  *      - bearerAuth: []
//  *     produces:
//  *       - application/json
//  *     responses:
//  *       200:
//  *         description: An array containing users metadata.
//  *       401:
//  *         description: Invalid API token.
//  *       403:
//  *         description: Expired or denied API token.
//  *       500:
//  *         description: Error handler.
//  */
// router.get("/",
// 	parseJWT,
// 	validateJWT,
// 	async (req: Request, res: Response) => {
// 		return res.status(200).send(await users.retrieveAllUsersInfo());
// 	}
// );
/**
 * @swagger
 * /api/users/:userId
 *   get:
 *     tags: [Users]
 *     summary: Display information about a specific user.
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        description: The User's ID.
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: An object representing the user's metadata.
 *       401:
 *         description: Invalid API token.
 *       403:
 *         description: Expired or denied API token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error handler.
 */
router.get("/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res.status(200)).send;
                return [4 /*yield*/, users_1["default"].retrieveUserInfo({
                        "id": Number(req.params.userId)
                    })];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
//
//
// /**
//  * @swagger
//  * /api/users/:userId
//  *   delete:
//  *     tags: [Users]
//  *     summary: Delete a specific user.
//  *     security:
//  *      - bearerAuth: []
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *      - name: userId
//  *        in: path
//  *        required: true
//  *        description: The User's ID.
//  *        schema:
//  *          type: string
//  *     responses:
//  *       200:
//  *         description: Operation status.
//  *       401:
//  *         description: Invalid API token.
//  *       403:
//  *         description: Expired or denied API token.
//  *       404:
//  *         description: User not found.
//  *       500:
//  *         description: Error handler.
//  */
// router.delete("/:userId",
// 	parseJWT,
// 	validateJWT,
// 	async (req: Request, res: Response) => {
// 		return res.status(200).send(
// 			await users.deleteUser(Number(req.params.userId))
// 		);
// 	}
// );
exports["default"] = router;
