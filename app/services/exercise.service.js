const {exerciseDb} = require('../db/index.js')

create = async function (id, description, duration, date) {
    try {
        return await exerciseDb.create(id, description, duration, date)
    } catch (e) {
        throw new Error(e.message)
    }
}

exports.create = create


