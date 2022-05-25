const { Client } = require('pg')

async function main() {
    const client = new Client({
        host: 'localhost',
        user: 'serkan',
        password: '123456',
        database: 'projectx'
    })
    await client.connect()
    const res = await client.query('SELECT $1 as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})