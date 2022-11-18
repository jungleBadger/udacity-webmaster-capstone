"use strict";

import {Router, Request, Response} from "express";
const router: Router = Router();
import users from "../../helpers/users";
import {parseJWT} from "../middlewares/auth";

/**
 * @swagger
 * /refresh
 *   get:
 *     tags: [Auth]
 *     summary: Validate user credentials and return a JWT.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Authentication process went through - the JWT string will be returned to the user.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Error handler.
 */
router.all("/refresh",
	parseJWT,
	async (req: Request, res: Response) => {
		return res.status(200).send(await users.refreshJWT(res.locals.token));
	}
);


/**
 * @swagger
 * /auth/login
 *   get:
 *     tags: [Auth]
 *     summary: Validate user credentials and return a JWT.
 *     security:
 *      - ApiKeyAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Authentication process went through - the JWT string will be returned to the user.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Error handler.
 */
router.all("/login",
	async (req: Request, res: Response) => {
		return res.status(200).send(await users.authorizeUser(
			req.query.username || req.body.username,
			req.query.password || req.body.password
		));
	}
);


/**
 * @swagger
 * /auth/signup
 *   get:
 *     tags: [Auth]
 *     summary: Creates a new user.
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: username
 *        in: body
 *        required: true
 *        description: The User's name.
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
	async (req: Request, res: Response) => {
		return res.status(201).send(
			await users.createUser(
				req.body.username,
				req.body.rawPassword || req.body.password
			)
		);
	}
);

export default router;