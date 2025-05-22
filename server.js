require('dotenv').config();
const express = require("express");
const app = express();
const router = require("./routes");
const mongoDB = require("./data/database")
const bodyParser = require("body-parser")


const port = process.env.PORT || 3000

app.use("/", bodyParser.json())
app.use("/", router)


mongoDB.initializeDB(err => {
    if(err) {
        console.log(err)
    } else {
        app.listen(port)
        console.log(`Application is listening on: ${port}`)
    }
})

