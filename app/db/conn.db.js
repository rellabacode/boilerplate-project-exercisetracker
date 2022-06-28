// const {MongoClient} = require('mongodb')
const  mongoose = require('mongoose')
require("dotenv").config()
const connectionString = process.env.MONGO_URI

console.log(process.env.MONGO_URI)

// const client = new MongoClient(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 1000
// })

let dbConnection;

module.exports = {
    mongoConnect: async function () {
        try {
            // await client.connect(async function (error, db) {
            //     if (error || !db) throw Error(error.message)
            //     dbConnection = db.db('trackingDb');
            // })
            await mongoose.connect(process.env.MONGO_URI,  { useNewUrlParser: true });
        } catch (e) {
            console.log("error connecting")
            console.log(e)
        }
    },
    mongoConnection: function () {
        return mongoose.connection;
    },

    isConnected: function () {
        /*
        0: disconnected, 1: connected
        2: connecting, 3: disconnecting
        */
        return mongoose.connection.readyState
    }
}