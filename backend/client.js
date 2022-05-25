let client;

module.exports.getDB = async function() {
    if(!client) {
        client = new Client({
            host: 'localhost',
            user: 'serkan',
            password: '123456',
            database: 'projectx'
        });
        await client.connect();
    }
    return client;
}