const env = require('./env.js');
module.exports = {
    development: {
        client: 'mysql',
        connection: env.mysql,
    },
};
