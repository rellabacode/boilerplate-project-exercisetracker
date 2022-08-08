const {logDb} = require('../db/index.js')
const path = require('path')
const scriptName = path.basename(__filename)

genUserLog = async function (userId) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "
    console.log(baseLog)




    return logDb.genUserLog(userId)
}

module.exports = {
    genUserLog
}