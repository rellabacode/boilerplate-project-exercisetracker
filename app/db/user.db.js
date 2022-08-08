const {getDb} = require('./conn.db')
const {userModel} = require('../models/index.js')
const {Schema} = require("mongoose");
const {UserModel, User} = require("../models/user.model");
const {log} = require("debug");

const path = require('path')
const {ExerciseModel} = require("../models");
const scriptName = path.basename(__filename)

/***
 * Create an user document with attribute username value equals to username parameter
 * @param username
 * @returns {Promise<unknown>}
 */
const create = async (username) => {
    return new Promise(async (resolve, reject) => {
        const user = new UserModel({username: username})
        // console.log(user)
        let baseLog = "(" + scriptName + "):: " + Object.values(this)[0].name + " "
        let baseLogError = "(" + scriptName + "):: " + arguments.callee.name + " ERROR "
        console.log(baseLog + "user to create")
        console.log(user)

        try {
            const newUser = await user.save()
            console.log(baseLog + "user created")
            console.log(newUser)

            let finalUser = await UserModel.findById(newUser._id).select("-__v").exec()

            console.log(baseLog + "user modified to return")
            console.log(finalUser)

            resolve(finalUser)
        } catch (e) {
            console.error(baseLogError)
            console.error(e.errmsg)

            let json = {status: 500, message: ""}
            switch (e.code) {
                case 11000:
                    json.status = 409
                    json.message = "Duplicated username"
                    break

                default:
                    json.message = "Unkown error with mongocode E" + e.code
            }

            reject(json)
        }
    })
}
/**
 * Search an user document with id matching the param
 * @param id
 * @returns {Promise<unknown>}
 */
const findById = async (id) => {
    let baseLog = "(" + scriptName + ")::findById "
    let baseLogError = "(" + scriptName + ")::findById ERROR "
    console.log(baseLog + " id " + id)

    try {
        const user = await User.findById(id).exec()

        console.log(baseLog + "returning user:")
        console.log(user)
        return user
    } catch (e) {
        console.error(baseLogError)
        console.error(e.errmsg)
        // return reject({status: 500, message: e.code + " Error finding user with id " + id});ç
        return null
    }
}

const findByUsername = async (username) => {
    // return new Promise((resolve, reject) => {
    let baseLog = "(" + scriptName + ")::findByUsername "
    console.log(baseLog + username)

    try {
        const user = await User.find({username: username}).exec()
        console.log(baseLog + "retornando")
        console.log(user)
        return user;
        // resolve(user)
    } catch (e) {
        console.error(e)
        return null;
        // reject(e.message)
    }
    // })
}


const getAll = function () {
    return new Promise((resolve, reject) => {
        try {
            User.find(function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        } catch (e) {
            console.error(e)
            reject(e.message)
        }

    })
}


exports.create = create
exports.getAll = getAll
exports.findById = findById
exports.findByUsername = findByUsername