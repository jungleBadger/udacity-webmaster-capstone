const {defaults} = require('jest-config');

/** @type {import('jest').Config} */
const config = {
	testEnvironment: "node",
	transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
};

module.exports = config;