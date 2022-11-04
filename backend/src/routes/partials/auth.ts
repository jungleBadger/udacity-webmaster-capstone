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
 * /auth
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

export default router;