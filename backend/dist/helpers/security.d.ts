/**
 * Generates a JWT applying app configs
 * @method generateJWT
 * @param {string|Buffer|object} rawData - Raw data to build the JWT.
 * @param {string} [secret] - Token to sign the secret, defaults to APP_SECRET env.
 * @param {object} [options] - Token options. {@see https://tools.ietf.org/html/rfc7519#section-4.1}
 * @return {Promise<string|Error>} Containing the hashed token.
 */
export declare function generateJWT(rawData?: object | string, secret?: string, options?: any): Promise<string | Error>;
/**
 * Validates an app generated JWT
 * @method validateJWT
 * @param {string} token - Hashed string to be checked.
 * @param {string} [secret] - Token to sign the secret, defaults to APP_SECRET env.
 * @param {object} [options={}] - Token options. {@see https://tools.ietf.org/html/rfc7519#section-4.1}
 * @throws Will throw a `400 - bad request` if required params are missing.
 * @throws Will throw a `401 - unauthorized` if the token validation fails.
 * @throws Will throw a `422 - unprocessable entity` if the token string is malformed.
 * @return {Promise<object|Error>} Containing the result of comparison
 */
export declare function validateJWT(token: string, secret?: string, options?: {}): Promise<string | Error>;
/**
 * Generates a Hash from a given data.
 * @method generateHash
 * @param {string|Buffer} rawData - Raw data to be hashed.
 * @param {number} [customRounds=10] - Token to sign the secret, defaults to APP_SECRET env.
 * @return {Promise<string|Error>} Containing the hashed token.
 */
export declare function generateHash(rawData: string, customRounds?: number): Promise<string | Error>;
/**
 * Compares raw data with a previously generated hash.
 * @method compareHash
 * @param {string|Buffer} rawData - Raw data to be compared.
 * @param {string} hash - Previously hashed password to be compared.
 * @return {Promise<Boolean|Error>} Containing the hashed token.
 */
export declare function compareHash(rawData: string, hash: string): Promise<boolean | Error>;
