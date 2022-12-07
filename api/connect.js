const { MongoClient } = require("mongodb");

const username = encodeURIComponent("timb2");
const password = encodeURIComponent("securepassword");
const cluster = "cluster0.5xd1mal.mongodb.net";

let uri =
  `mongodb+srv://${username}:${password}@${cluster}/test`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("<dbName>");
    const ratings = database.collection("<collName>");

    const cursor = ratings.find();

    await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
