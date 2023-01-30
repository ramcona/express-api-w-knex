const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test_express',
        port: 8889
    },
    debug: true
});


module.exports = knex