"use strict";

import routes from "./routes";

import express, {Application} from "express";
import debug from "debug";

import {readFileSync} from "fs";
import {createServer as createHTTPServer, Server as HTTPServer} from "http";
import {createServer as createHTTPSServer, Server as HTTPSServer} from "https";
import * as engines from "consolidate";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();
const APP_PORT: number|string = process.env.APP_PORT || 3030;
const log: any = debug("app:main");
const httpLog: any = debug("app:endpoint");

import users from "./helpers/users";

app.use(cors());
app.use(cookieParser(process.env.APP_SECRET));
app.engine("html", engines.ejs);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../", "frontend"));
app.use(express.static(path.join(__dirname, "../", "frontend")));
app.use(express.urlencoded({
	"extended": true,
	"limit": "3mb"
}));
app.use(express.json());

if (httpLog.enabled) {
	app.use(
		morgan(
			"combined",
			{
				"stream": {
					"write": (msg: string) => httpLog(msg.trimEnd())
				}
			}
		)
	);
}

export async function run (CUSTOM_APP_PORT: number = 0, skipAdminAdd: boolean = false) {

	let server: HTTPSServer|HTTPServer;
	if (process.env.LOCAL_HTTPS) {
		server = createHTTPSServer({
			"key": readFileSync(path.join(__dirname, "..", "certificates/local/localhost-privkey.pem")),
			"cert": readFileSync(path.join(__dirname, "..", "certificates/local/localhost-cert.pem")),
			"rejectUnauthorized": false
		}, app);
	} else {
		server = createHTTPServer(app);
	}

	log(`${process.env.LOCAL_HTTPS ? "HTTPS" : "HTTP"} server created`);

	if (!skipAdminAdd) {
		try {
			await users.createUser(
				process.env.ADMIN_USER || "admin",
				process.env.ADMIN_PASSWORD || "admin123"
			);
			log("Default admin user created.");

		} catch (e) {
			log("Default admin already exists.");
		}
	}

	server.listen(CUSTOM_APP_PORT || APP_PORT, function () {
		routes(app);
		log(`Server started at port: ${CUSTOM_APP_PORT || APP_PORT}`);
	});

	return server;
}