const {userDb} = require('../db/index.js')
const {mongoose} = require("mongoose");
const {userService} = require("./index");

const path = require('path')
const scriptName = path.basename(__filename)

/**
 * Tries to create a user with the provided username
 * @param username
 * @returns {Promise<unknown>}
 */
const create = function (username) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "

    console.log(baseLog)
    return userDb.create(username)
}

const findById = function (username) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "

    console.log(baseLog)

    return userDb.findById(username)



    // try {
    //
    //     console.log(baseLog+" usuario encontrado")
    //     console.log(user)
    //     return user
    // } catch (e) {
    //     console.error(e)
    // }

}

/**
 * Check if an username is available on the system
 * @param username
 * @returns {Promise<Array<HydratedDocument<InferSchemaType<*>, ObtainSchemaGeneric<*, "TInstanceMethods">, {}>>|null|undefined>}
 */
const findByUsername = function (username) {
    let baseLogError = "(" + scriptName + "):: " + arguments.callee.name + " ERROR "

    return userDb.findByUsername(username)
}

/**
 *
 * @param username
 * @returns {Promise<unknown>}
 */
const getAll = async function (username) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "
    let baseLogError = "(" + scriptName + "):: " + arguments.callee.name + " ERROR "

    console.log(baseLog)
    return userDb.getAll(username)
}


exports.create = create
exports.getAll = getAll
exports.findById = findById
exports.findByUsername = findByUsername




