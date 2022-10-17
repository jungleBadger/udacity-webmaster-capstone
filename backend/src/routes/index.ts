"use strict";

import {Application, NextFunction, Request, Response} from "express";

import {parseJWT, validateJWT} from "./middlewares/auth";
import authHandler from "./partials/auth";
import usersHandler from "./partials/user";

export default function (app: Application) {

	app.use("/auth", authHandler);
	app.use("/api/users", parseJWT, validateJWT, usersHandler);

	app.use((err: any, req: Request, res: Response, next: NextFunction) => {
		try {
			if (Object.prototype.hasOwnProperty.call(err, "status")) {
				return res.status(err.status || 500).send(err.message || err);
			} else {
				let parsedError = JSON.parse(err.message);
				return res.status(parsedError.status || 500).send(parsedError.message || err.message || "Unknown Error");
			}
		} catch (e) {
			return res.status(err.status || 500).send(err.message || err);
		}
	});

}