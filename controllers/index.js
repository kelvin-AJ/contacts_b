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
const { response } = require("express");
const bodyParser = require("body-parser")

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

    async addContact(req, res) {
        const {firstName, lastName, email, favoriteColor, birthday} = req.body
       
        const newContact = {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday,
        }

        const result = await mongodb.getDatabase().db("contactsdb").collection("contacts").insertOne(newContact);

        if(result.acknowledged){
            res.status(204)
                .json()
        }else{
            res.status(500)
                .json(result.error || "Something went wrong with the server😶")
        }
    },

    async updateContact(req, res) {
        const updatedContact = req.body
        const contactID = new ObjectId(req.params.id)

        // console.log(updatedContact)

        const result = await mongodb.getDatabase().db("contactsdb").collection("contacts").updateOne({_id: contactID}, {$set : updatedContact});


        // console.log(result)
        if(result.acknowledged){
            res.status(204)
                .send()
        }else{
            res.status(500)
                .json(result.error || "Something went wrong with the server😶")
        }
    },


    async deleteContact(req, res) {
        const contactId = new ObjectId(req.params.id);

        const result = await mongodb.getDatabase().db("contactsdb").collection("contacts").deleteOne({_id: contactId})

         if(result.deletedCount > 0){
            console.log(result)

            res.status(204)
                .send()
        }else{
            res.status(500)
                .json(result.error || "Something went wrong with the server😶")
        }
    }
}