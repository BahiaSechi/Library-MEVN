const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectId = require('mongodb').ObjectID;
const dbName = "web-services";
const accessTokenSecret = "web-services-secret"
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
    let user;
    collection.find({username: creds.username}).toArray()
        .then((userResponse) => { user = userResponse; })
        .then(() => {
            if(user[0] && user[0].username) {
                if(user[0].password === creds.password) {
                    const accessToken = jwt.sign({username: user[0].username, role: user[0].role}, accessTokenSecret);
                    resolve({token: accessToken, role: user[0].role, username: user[0].username});
                } else {
                    reject('Bad credentials.');
                }
            } else {
                reject('Bad credentials.');
            }
        })
        .catch(error => reject(error));
    });
}

const add = function (creds, loggedUser) {
    return new Promise((resolve, reject) => {
        const role = loggedUser.role;
        let user;

        let canCreate = false;

        switch (role) {
            case "ADMINISTRATOR_ROLE":
                canCreate = (creds.role === "CONTRIBUTOR_ROLE" || creds.role === "BORROW_ROLE" || creds.role === "CONSULT_ROLE");
                break;
            case "CONTRIBUTOR_ROLE":
                canCreate = (creds.role === "BORROW_ROLE" || creds.role === "CONSULT_ROLE");
                break;
            case "BORROW_ROLE":
                canCreate = (creds.role === "CONSULT_ROLE");
                break;
            default:
                return false;
        }

        if (canCreate) {
            collection.find({username: creds.username}).toArray()
                .then((userResponse) => { user = userResponse; })
                .then(() => {
                    if(user[0] && user[0].username) {
                        reject({ message:"Ce compte existe déjà."});
                    } else if (creds.password.length < 8) {
                        reject('Your password needs to have at least 8 characters.');
                    }
                    else {
                        const newUser = {
                            username: creds.username,
                            password: creds.password,
                            role: creds.role
                        };
                        collection.insertOne(newUser).then(() => {
                            resolve();
                        }).catch(error => reject(error));
                    }
                });
        } else {
            reject({ message:"Vous n'avez pas la permission de créer cet utilisateur."});
        }
    })
}


const register = function (creds) {
    return new Promise((resolve, reject) => {
        let user;
        collection.find({username: creds.username}).toArray()
            .then((userResponse) => { user = userResponse; })
            .then(() => {
                if(user[0] && user[0].username) {
                    reject({ message:"Ce compte existe déjà."});
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

const getById = function(userId){
    return new Promise((resolve, reject) => {
        if(userId) {
            let objId = new ObjectId(userId);
            collection.findOne({"_id": objId})
                .then(ret => {
                    if(ret){
                        resolve(ret)
                    } else {
                        reject("User with id " + userId + " does  not exist.");
                    }
                })
        } else {
            reject("No provided id.");
        }
    });
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
exports.getById = getById;
exports.add = add;