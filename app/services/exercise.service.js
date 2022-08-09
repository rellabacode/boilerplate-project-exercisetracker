const {exerciseDb} = require('../db/index.js')

const path = require('path')
const scriptName = path.basename(__filename)

create = function (objectid, username, description, duration, date) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "
    console.log(baseLog)
    return exerciseDb.create(objectid, username, description, duration, date)
}

deleteAll = function (id, description, duration, date) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "
    return exerciseDb.deleteAll()
}

exports.create = create
exports.deleteAll = deleteAll


