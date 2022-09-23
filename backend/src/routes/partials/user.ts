"use strict";

import { Router, Request, Response } from "express";
import users from "../../helpers/users";
import { parseJWT, validateJWT } from "../middlewares/auth";

const router: Router = Router();

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
router.post("/create",
	parseJWT,
	validateJWT,
	async (req: Request, res: Response) => {
		return res.status(201).send(
			await users.createUser(
				req.body.username,
				req.body.rawPassword || req.body.password
			)
		);
	}
);

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
//
// /**
//  * @swagger
//  * /api/users/:userId
//  *   get:
//  *     tags: [Users]
//  *     summary: Display information about a specific user.
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
//  *         description: An object representing the user's metadata.
//  *       401:
//  *         description: Invalid API token.
//  *       403:
//  *         description: Expired or denied API token.
//  *       404:
//  *         description: User not found.
//  *       500:
//  *         description: Error handler.
//  */
// router.get("/:userId",
// 	parseJWT,
// 	validateJWT,
// 	async (req: Request, res: Response) => {
// 		return res.status(200).send(
// 			await users.retrieveUserInfo({
// 				"id": Number(req.params.userId)
// 			})
// 		);
// 	}
// );
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


export default router;