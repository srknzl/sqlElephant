const {Client} = require('pg');

let client;

module.exports.getDB = async function() {
    if(!client) {
        client = new Client({
            host: 'localhost',
            user: 'serkan',
            password: '123456',
            database: 'dvdrental'
        });
        await client.connect();
    }
    return client;
}