const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017"
const dbName = "web-services";
const collectionName = "users"
let collection;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},
    async function (err, client) {
        if (err) throw err;
        const db = client.db(dbName);
        console.log("Connected to " + db.databaseName);
        collection = db.collection(collectionName);

        const {ops: ret} = await collection.insertOne({username: "NoName", password:'1234', role:'CONSULT_ROLE'});
        console.log("Created " + JSON.stringify(ret[0]));

        const obj = await collection.findOne({"_id": new ObjectId(ret[0]._id)});
        console.log("Found " + JSON.stringify(obj));
        const {modifiedCount: mod} = await collection.updateOne({
            "_id": new
            ObjectId(ret[0]._id)
        }, {$set: {username: "Hizoren"}});
        console.log("Modified " + mod);

        const obj2 = await collection.findOne({"_id": new ObjectId(ret[0]._id)});
        console.log("Found " + JSON.stringify(obj2));

        const array = await collection.find({}).toArray();
        console.log(JSON.stringify(array));

        client.close();
    });