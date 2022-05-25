const { Client } = require('hazelcast-client');

const PN_COUNTER_COUNT = 20;

async function main() {
    const client = await Client.newHazelcastClient();
    setInterval(async () => {
        const n = Math.trunc(Math.floor((Math.random() * PN_COUNTER_COUNT) + 1)); // 1 to n

        const pnCounter = await client.getPNCounter(`views${n}`);
        console.log(pnCounter.getName());
        console.log(await pnCounter.addAndGet(1));
    }, 200);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});