import { User } from "../models/User";
declare const _default: {
    User: any;
    /**
     * Creates a new User.
     * @method createUser
     * @async
     * @param {string} username - User's unique name - a sort of nickname.
     * @param {string} rawPassword - User's raw password - this will be converted to a hash.
     * @return {Promise<User|Error>} Containing the created User object.
     */
    createUser: (username: string, rawPassword: string) => Promise<User | Error>;
    /**
     * Retrieves a single User object based on a query.
     * @method retrieveUserInfo
     * @async
     * @param {object} query - Query object to fetch User through ID or username.
     * @param {boolean} [includePassword=false] - Include User's hashed password into the result object.
     * @param {boolean} [acceptNotFound=false] - Define if the code should emit an error if no entries are found.
     * @return {Promise<User|null|Error>} Object containing the User object.
     */
    retrieveUserInfo: (query: {
        "id"?: number | undefined;
        "username"?: string | undefined;
    }, includePassword?: boolean, acceptNotFound?: boolean) => Promise<User | null | Error>;
    /**
     * Create a JWT string upon user authentication.
     * @method authorizeUser
     * @async
     * @param {string} username - User's unique name - a sort of nickname.
     * @param {string} rawPassword - User's raw password - this will be compared against the stored hash.
     * @return {Promise<String|Error>} JWT string representing the User object and permissions.
     */
    authorizeUser: (username: string, rawPassword: string) => Promise<string | Error>;
};
export default _default;
