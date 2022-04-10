module.exports = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.host,
        port: process.env.port,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
});