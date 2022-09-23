'use strict';

var dbm;
var type;
var seed;

const usersTable = require("./partials/1-add-users");
const todosTable = require("./partials/2-add-todos");
const logsTable = require("./partials/3-add-logs");


/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db, cb) {
	await usersTable.up(db);
	await todosTable.up(db);
	await logsTable.up(db);
	return cb();
};

exports.down = async function(db, cb) {
	await logsTable.down(db);
	await todosTable.down(db);
	await usersTable.down(db);
	return cb();
};

exports._meta = {
  "version": 1
};
