const express = require('express')
const app = express()
const routes = require('./app/routes/index.js')
// const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./app/db/conn.db.js')
const {EOL} = require("os")
const path = require('path');
const scriptName = path.basename(__filename);

const fs = require('fs')

// var requestsLog = fs.createWriteStream(__dirname + path.sep + "app" +
//     path.sep + "logs" + path.sep + "requests.log", {flags: 'a'})


const enableCORS = function (req, res, next) {
    if (!process.env.DISABLE_XORIGIN) {
        const allowedOrigins = ["https://www.freecodecamp.org"];
        const origin = req.headers.origin;
        if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
            console.log("(" + scriptName + ")" + req.method);
            res.set({
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
            });
        }
    }
    next();
};

//use of middleware
app.use(bodyParser.urlencoded({extended: "false"}));
// create application/json parser
app.use(bodyParser.json());
app.use(express.static('public'))

// global setting for safety timeouts to handle possible
// wrong callbacks that will never be called
const TIMEOUT = 10000;

const conn = require('./app/db/conn.db.js');
const router = express.Router();
conn.mongoConnect().then(function () {
    if (!conn.isConnected()) {
        console.error("(" + scriptName + ")mongodb status " + conn.mongoStatus())
        process.exit(1);
    }

    console.log("(" + scriptName + ")" + "mongodb database connected");
    conn.mongoDrop().then(function () {
        console.log("(" + scriptName + ")" + "mongodb database dropped");

        conn.mongoBuildIndexes().then(function () {
            console.log("(" + scriptName + ")" + "mongodb database indexes synchronized");

            // a middleware with no mount path; gets executed for every request to the app
            app.use(function (req, res, next) {
                let baseLog = "(Middleware every request) "
                let baseLogError = "ERROR (Middleware every request) "

                if (req.header("user-agent") === "not axios") return next()

                const d = new Date()
                const fileName = "requests_" + d.getFullYear()
                    + "_" + (d.getMonth() + 1) + "_" + d.getDate() + ".log"
                const time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
                const content = time + " [original " + JSON.stringify(req.originalUrl)
                    + " body " + JSON.stringify(req.body)
                    + " params " + JSON.stringify(req.params) + "\n"
                    + " query " + JSON.stringify(req.query) + "] \n"

                try {
                    fs.writeFileSync(__dirname + path.sep + "app" +
                        path.sep + "logs" + path.sep + fileName, content,
                        {flag: 'a+'})

                } catch (e) {
                    console.error(baseLogError + e.message)
                    console.log(baseLog + content)
                }

                // requestsLog.writeFile
                next();
            });

            app.use("/api", enableCORS, routes)
            app.get('/', enableCORS, (req, res) => {
                res.sendFile(path.resolve(__dirname + '/app/views/index.html'))
            })

            // Error handler
            app.use(function (err, req, res, next) {
                console.log("(" + scriptName + ")" + "error handler")
                if (err) {
                    res.status(err.status || 500).type("txt").send(err.message || "SERVER ERROR");
                }
            })

            // Unmatched routes handler
            app.use(function (req, res) {
                console.log("(" + scriptName + ")" + "unmatched routes handler")
                if (req.method.toLowerCase() === "options") {
                    res.end();
                } else {
                    res.status(404).type("txt").send("Not Found");
                }
            })

            const listener = app.listen(process.env.PORT || 3000, () => {
                console.log("(" + scriptName + ")" + 'your app is listening on port ' + listener.address().port)
            })
        })
    }).catch(e => {
        console.error(e)
        process.exit(1);
    })

}).catch(e => {
    console.log("(" + scriptName + ")finishing app");
    console.error(e);
    process.exit(1);
})

module.exports = {
    app
}

