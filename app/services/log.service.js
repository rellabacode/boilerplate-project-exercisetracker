const {logDb} = require('../db/index.js')
const path = require('path')
const scriptName = path.basename(__filename)

genUserLog = function (username, from, to, limit) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "
    console.log(baseLog)
    return logDb.genUserLog(username, from, to, limit)
}

module.exports = {
    genUserLog
}