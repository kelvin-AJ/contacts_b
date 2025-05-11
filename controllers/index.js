/*
const {MongoClient} = require("mongodb");
const model = require("../..")

const client = new MongoClient(process.env.CONNECTION_STRING)


module.exports = {
    async initializeDB(req, res) {
        client.connect();
        await model.populateDB(client)
        res.send("Populated")
    }
}
*/

const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");

module.exports = {
    async getAll(req, res) {
        const result = await mongodb.getDatabase().db("contactsdb").collection("contacts").find();
        result.toArray().then(users => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(users);
        });
    },

    async getSingle(req, res) {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db("contactsdb").collection("contacts").find({_id: userId});
        result.toArray().then(users => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(users[0]);
        })
    },

    
}