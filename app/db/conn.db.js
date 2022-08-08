// const {MongoClient} = require('mongodb')
let mongoose;
try {
    mongoose = require('mongoose')
} catch (e) {
    console.error(e)
}
const path = require('path');
const {Error} = require("mongoose");
const {UserModel, ExerciseModel} = require("../models");
const scriptName = path.basename(__filename);

require("dotenv").config()
const connectionString = process.env.MONGO_URI

// const client = new MongoClient(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 1000
// })

let dbConnection;

module.exports = {
    mongoDrop: async function () {
        try {
            console.log("(" + scriptName + ")droping content")
            await mongoose.connection.db.dropDatabase(function (err, result) {
                if (err) throw Error(err)
                console.log("(" + scriptName + ")dropping result " + result)
            })


        } catch (e) {
            console.error(e)
        }
    },

    mongoBuildIndexes: async function () {
        try {
            await UserModel.syncIndexes()
            await ExerciseModel.syncIndexes()
        } catch (e) {
            console.error(e)
        }
    },

    mongoConnect: async function () {
        try {
            // await client.connect(async function (error, db) {
            //     if (error || !db) throw Error(error.message)
            //     dbConnection = db.db('trackingDb');
            // })
            console.log("(" + scriptName + ")connecting to " + connectionString)
            await mongoose.connect(connectionString, {useNewUrlParser: true, autoIndex: true});
        } catch (e) {
            console.error("(" + scriptName + ")error connecting")
            console.log(e)
        }
    },
    mongoConnection: function () {
        return mongoose.connection;
    },

    mongoStatus: function () {
        /*
        0: disconnected, 1: connected
        2: connecting, 3: disconnecting
        */
        return mongoose.connection.readyState
    },

    isConnected: function () {
        return mongoose.connection.readyState === 1
    }

}