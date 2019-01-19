const env = require('../env.js');
var knex = require('knex')({
  client: 'mysql',
  connection: env.mysql
});

module.exports = knex;

