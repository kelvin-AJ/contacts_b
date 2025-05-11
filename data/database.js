require('dotenv').config();

const {MongoClient} = require("mongodb")

let database;

module.exports = {
    async initializeDB(callback) {
        if(database) {
            console.log("Database has been initialized")
            return callback(null, database)
        }


        MongoClient.connect(process.env.CONNECTION_STRING)
        .then(client => {
            database = client;
            callback(null, database)
        })
        .catch(err => {
            callback(err);
        })
    },

    getDatabase() {
        if(!database) {
            throw Error("Database has not been initialized")
        }
        return database;
    }
}