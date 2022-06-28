const {userDb} = require('../db/index.js')

module.exports.create = async function (username) {
    try {
        return await userDb.create(username)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports.getAll = async function (username) {
    try {
        return await userDb.getAll(username)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports.findById = async function (username) {
    try {
        return await userDb.findById(username)
    } catch (e) {
        console.error("user.service findById ERROR")
        throw new Error(e.message)
    }
}



