import { Sequelize } from "sequelize";
declare class Database {
    /**
     * Hold the instantiated Sequelize instance.
     *
     * @memberOf Database
     * @public
     */
    Client: Sequelize;
    /**
     * Hold the valid Data types
     *
     * @memberOf Database
     * @public
     */
    DataTypes: any;
    /**
     * Hold the valid Operators
     *
     * @memberOf Database
     * @public
     */
    Op: any;
    /**
     * Create a new Database instance using the provided connection info returning a Sequelize instance.
     *
     * @memberOf Database
     * @private
     * @param {string} dbType - Type of the database to be created.
     * @param {Object} dbConnectionInfo - The instance's URL.
     * @param {string} dbConnectionInfo.database - The instance's database.
     * @param {string} dbConnectionInfo.password - The instance's password.
     * @param {string} dbConnectionInfo.host - The instance's host URL.
     * @param {number} dbConnectionInfo.port - The instance's port.
     * @param {string} [dbConnectionInfo.b64Certificate] - The instance's base 64 certificate.
     * @return {Sequelize} A Sequelize instance {@see https://sequelize.org/master/}
     */
    private buildConnection;
    /**
     * Constructs new Database instance using the provided connection info.
     *
     * @constructor
     * @param {string} dbType - Type of the database to be created.
     * @param {Object} dbConnectionInfo - The instance's URL.
     * @param {string} dbConnectionInfo.username - The instance's username.
     * @param {string} dbConnectionInfo.password - The instance's password.
     */
    constructor(dbType: string, dbConnectionInfo: Object);
}
export default Database;
