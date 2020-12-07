const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "web-services";
let dbClient;
let collection;

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
    if (err) throw err;
    dbClient = client;
    let db = client.db(dbName);
    console.log("[startup] Connected to " + db.databaseName);
    collection = db.collection("users");
});

const login = function (creds) {
    return new Promise((resolve, reject) => {
        console.log(creds)
        let user;
        collection.find({username: creds.username}).toArray()
        .then((userResponse) => { user = userResponse; })
        .then(() => {
            if(user[0] && user[0].username) {
                if(user[0].password === creds.password) {
                    resolve();
                } else {
                    reject('Bad credentials.');
                }
            } else {
                reject('Bad credentials.');
            }
        });
    })
}

exports.login = login;
