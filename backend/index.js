const { Client } = require('hazelcast-client');
const express = require('express');

const app = express();
let client;

// Intended to be used only with mock data.
const fetchViewCountsOfMockData = async (mockData) => {
    for (const film of mockData) {
        const pnCounter = await client.getPNCounter(`views${film.id}`);
        console.log(pnCounter.getName());
        const viewCountLong = await pnCounter.get();
        console.log(viewCountLong.toString());
        film["viewCount"] = viewCountLong.toString();
    }
};

const mockData = [{
    id: 1,
    name: 'Film 1',
}, {
    id: 2,
    name: 'Film 2'
},
{
    id: 3,
    name: 'Film 3'
},
{
    id: 4,
    name: 'Film 4'
},
{
    id: 5,
    name: 'Film 5'
}
];

app.get("/", async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    await fetchViewCountsOfMockData(mockData);
    res.json(mockData);
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
