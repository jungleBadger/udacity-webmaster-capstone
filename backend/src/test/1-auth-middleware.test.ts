"use strict";



import {describe, expect, test} from '@jest/globals';

import * as dotenv from "dotenv";
let dotEnvProps: Object = {};
dotenv.config(dotEnvProps);
import bent from "bent";
import {run} from "../server";
import users from "../helpers/users";


const APP_PORT: number = Number(process.env.APP_PORT || 3030);
const API_URL = `${process.env.LOCAL_HTTPS ? "https" : "http"}://localhost:${APP_PORT}/api`;
let server: any;



describe("Endpoints testing", function() {

	beforeAll(async () => {
		server = await run(
			APP_PORT,
			false
		);
		return true;
	});


	describe("Unauthenticated requests", function () {
		it("should respond with an error if JWT is unavailable", async () => {
			const post = bent(`${API_URL}`, "POST", "string", 400);

			const response = await post('/users/create', {
				"username": `${Date.now()}_API_USER`,
				"firstName": "TEST_USER_API",
				"lastName": "TEST",
				"rawPassword": "TEST_PASSWORD"
			});
			expect(response).toEqual("Token not found - send it through Auth header or signed cookie.");
			return true;
		});

		it("should respond with an error if Auth header has an invalid model", async () => {
			const post = bent(`${API_URL}`, "POST", "string", 400, {
				"Authorization": "xxxx"
			});

			const response = await post('/users/create', {
				"username": `${Date.now()}_API_USER`,
				"firstName": "TEST_USER_API",
				"lastName": "TEST",
				"rawPassword": "TEST_PASSWORD"
			});

			expect(response).toEqual("Empty token.");
			return true;
		});

	});


	describe("Authenticated requests", function () {

		let validToken: string;

		it("should generate a valid token", async () => {
			validToken = await users.authorizeUser(
				process.env.ADMIN_USER || "admin",
				process.env.ADMIN_PASSWORD || "admin123"
			) as string;

			expect(validToken).toBeTruthy();
			return true;
		});

		it("should validate the JWT token", async() => {
			const INVALID_USER_ID = "9999999999999";
			const get = bent(`${API_URL}`, "GET", "string", 404, {
				"Authorization": `Bearer ${validToken}`
			});
			const response = await get(`/users/${INVALID_USER_ID}`);
			expect(response).toEqual(`User ${INVALID_USER_ID} not found.`);
			return true;
		});

	});


});