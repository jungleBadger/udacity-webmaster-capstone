
import {TABLE_REFERENCE, User, userModel} from "../models/User";
import { generateHash, compareHash, generateJWT } from "./security";

import Database from "./Database";
import sequelizeTableConfig from "../configs/sequelizeTableConfig";

const DB_PREFIX = (process.env.NODE_ENV || "").toLowerCase() === "test" ? "TEST_" : "";
const dbObject: any = new Database("postgres", {
	"database": process.env[`${DB_PREFIX}POSTGRES_DB`],
	"username": process.env[`${DB_PREFIX}POSTGRES_USER`],
	"password": process.env[`${DB_PREFIX}POSTGRES_PASSWORD`],
	"host": process.env[`${DB_PREFIX}POSTGRES_HOST_URL`],
	"port": process.env[`${DB_PREFIX}POSTGRES_PORT`]
});


export default {

	"User": dbObject.Client.define(
		TABLE_REFERENCE,
		userModel(),
		sequelizeTableConfig
	),


	/**
	 * Creates a new User.
	 * @method createUser
	 * @async
	 * @param {string} username - User's unique name - a sort of nickname.
	 * @param {string} rawPassword - User's raw password - this will be converted to a hash.
	 * @return {Promise<User|Error>} Containing the created User object.
	 */
	"createUser": async function (
		username: string,
		rawPassword: string
	): Promise<User|Error> {
		if (!username || !rawPassword) {
			throw new Error(JSON.stringify({
				"status": 400,
				"message": "Missing User properties."
			}));
		}

		try {
			return (await this.User.create({
				"username": username,
				"password": await generateHash(rawPassword)
			})).toJSON();
		} catch (e: any) {
			if (e.name === "SequelizeUniqueConstraintError") {
				throw new Error(JSON.stringify({
					"status": 409,
					"message": `User ${username} already exists.`
				}));
			} else {
				throw e;
			}
		}
	},


}