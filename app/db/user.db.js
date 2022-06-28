const {getDb} = require('./conn.db')
const {userModel} = require('../models/index.js')
const {Schema} = require("mongoose");
const {UserModel, User} = require("../models/user.model");
const {log} = require("debug");

const create = (username) => {
    return new Promise((resolve, reject) => {
        const user = new UserModel({username: username})
        console.log(user)

        try {
            const newUser = user.save()
            console.log("usuario creado")
            console.log(newUser)
            resolve(newUser)
        } catch (e) {
            console.error(e)
            reject(e.message)
        }
    })
}


const findById = async (id) => {
    // return new Promise((resolve, reject) => {
    console.log("--------userdb::findbyid--------")
    console.log("--------userdb::findbyid-------- id " + id)

    try {
        const user = await User.findById(id).exec()

        console.log("--------userdb::findbyid--------retornando " + new Date())
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