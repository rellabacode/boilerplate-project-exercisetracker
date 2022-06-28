const express = require('express')
const app = express()
const routes = require('./app/routes/index.js')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./app/db/conn.db.js')

app.use(cors())
//use of middleware
app.use(bodyParser.urlencoded({extended: "false"}));
// create application/json parser
app.use(bodyParser.json());
app.use(express.static('public'))

// global setting for safety timeouts to handle possible
// wrong callbacks that will never be called
const TIMEOUT = 10000;

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})

console.log(listener.constructor)


const conn = require('./app/db/conn.db.js');
const {router} = require("express/lib/application");
conn.mongoConnect().then(function () {
    console.log("mongodb database status " + conn.isConnected());
    app.use(routes)

}).catch(e => {
    console.error("finishing app");
    console.error(e);
    listener.close();
    process.exit(1);
})

module.exports = {
    app
}

