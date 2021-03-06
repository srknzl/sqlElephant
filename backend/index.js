const { Client } = require('hazelcast-client');
const { getDB } = require('./client');
const express = require('express');

const app = express();
let client;

app.get("/", async (req, res, next) => {
    const db = await getDB();

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");

    db.query("select film_id as id, title as name, hzpn_get(concat('views', film_id)) as views from film order by id limit 20;", (err, r) => {
        if(err) {
            return res.json({err})
        }
        res.json(r.rows);
    });
});

app.get("/detail/:id", async (req, res, next) => {
    const db = await getDB();
    const id = req.params.id;

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");

    db.query(`select description, title as name, release_year as releaseYear, length, rating from film where film_id = ${id};`, (err, r) => {
        if(err) {
            return res.json({err})
        }
        res.json(r.rows[0]);
    });
});


Client.newHazelcastClient().then(c => {
    client = c;
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => {
    console.error(err);
    process.exit(1);
});
