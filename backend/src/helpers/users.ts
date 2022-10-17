
import {TABLE_REFERENCE, User, userModel} from "../models/User";
import { generateHash, compareHash, generateJWT } from "./security";

import Database from "./Database";
import sequelizeTableConfig from "../configs/sequelizeTableConfig";
import user from "../routes/partials/user";

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

	/**
	 * Retrieves a single User object based on a query.
	 * @method retrieveUserInfo
	 * @async
	 * @param {object} query - Query object to fetch User through ID or username.
	 * @param {boolean} [includePassword=false] - Include User's hashed password into the result object.
	 * @param {boolean} [acceptNotFound=false] - Define if the code should emit an error if no entries are found.
	 * @return {Promise<User|null|Error>} Object containing the User object.
	 */
	"retrieveUserInfo": async function (
		query: {
			"id"?: number|undefined,
			"username"?: string|undefined
		},
		includePassword: boolean = false,
		acceptNotFound: boolean = false
	): Promise<User|null|Error> {

		if (!query || (!query.id && !query.username)) {
			throw new Error(JSON.stringify({
				"status": 400,
				"message": "Invalid query options."
			}));
		}

		const userObject = await this.User.findOne({
			"attributes": includePassword ? {"exclude": [] } : {"exclude": ["password"]},
			"where": query
		});

		if (userObject) {
			return userObject.toJSON();
		} else {
			if (!acceptNotFound) {
				throw new Error(JSON.stringify({
					"status": 404,
					"message": `User ${query.id || query.username} not found.`
				}));
			} else {
				return null;
			}
		}
	},

	/**
	 * Create a JWT string upon user authentication.
	 * @method authorizeUser
	 * @async
	 * @param {string} username - User's unique name - a sort of nickname.
	 * @param {string} rawPassword - User's raw password - this will be compared against the stored hash.
	 * @return {Promise<String|Error>} JWT string representing the User object and permissions.
	 */
	"authorizeUser": async function(
		username: string,
		rawPassword: string
	): Promise<string|Error> {
		if (!username || !rawPassword) {
			throw new Error(JSON.stringify({
				"status": 400,
				"message": "Missing parameters to authorize user."
			}));
		}
		const userObject: any = await this.retrieveUserInfo(
			{
				username
			},
			true,
			false
		) as User;

		const isPasswordValid = await compareHash(
			rawPassword as string, userObject?.password
		) as boolean;

		if (isPasswordValid) {
			return await generateJWT(
				{
					...userObject,
					"password": undefined
				},
				process.env.APP_SECRET,
				{
					"expiresIn": "5 minutes"
				}
			);
		} else {
			throw new Error(JSON.stringify({
				"status": 401,
				"message": `Incorrect credentials. Modify it, and try again.`
			}));
		}
	}


}