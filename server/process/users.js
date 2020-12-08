const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectId = require('mongodb').ObjectID;
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
        })
        .catch(error => reject(error));
    })
}

const register = function (creds) {
    return new Promise((resolve, reject) => {
        console.log(creds)
        let user;
        collection.find({username: creds.username}).toArray()
            .then((userResponse) => { user = userResponse; })
            .then(() => {
                if(user[0] && user[0].username) {
                    reject('This account already exists.');
                } else {
                    const newUser = {
                        username: creds.username,
                        password: creds.password,
                        role: 'CONSULT_ROLE'
                    };
                    collection.insertOne(newUser).then(() => resolve()).catch(error => reject(error));
                }
            });
    })
}

const remove = function(id) {
    return collection.findOneAndDelete({"_id": new ObjectId(id)});
}

const list = function() {
    return collection.find({}).toArray();
}


exports.login = login;
exports.register = register;
exports.remove = remove;
exports.list = list;