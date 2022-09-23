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
};
export default _default;
