const {userService} = require("../services/index.js")
const {exerciseCtrl} = require("../controllers")
const {mongoose} = require("mongoose");
const {log} = require("debug");
const {UserModel} = require("../models/user.model.js")

const path = require("path")
const scriptName = path.basename(__filename)

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const create = async function (req, res, next) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "
    let baseLogError = "(" + scriptName + "):: " + arguments.callee.name + " ERROR "

    console.log(baseLog + " body parameters")
    console.log(req.body)
    let username = req.body.username;

    try {
        let user = await userService.create(username)
        res.status(201).send(user)
    } catch (e) {
        console.error(baseLogError)
        next(eval(e))
    }
}

/**
 * Search a document whose _id matches with the posted _id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const findById = async function (req, res, next) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "
    let baseLogError = "(" + scriptName + "):: " + arguments.callee.name + " ERROR "

    let userId = req.params._id

    try {
        console.log(baseLog + "testing objectid userId " + userId)
        let idMongoose = new mongoose.Types.ObjectId(userId)
        console.log(baseLog + "objectid userId is correct")
    } catch (e) {
        console.error(baseLogError)
        // console.error(e.request.data)
        next({status: 400, message: e.message})
    }

    console.log(baseLog + "param id " + userId)
    let users = await userService.findById(userId, next)
    console.log(baseLog + "finded user ")
    console.log(users)

    if (users === null || users.constructor === UserModel) {
        console.log(baseLog + "RETORNANDO USUARIO ")
        res.status(200).send(users)
    } else {
        console.error(baseLogError + "ERROR BUSCANDO USUARIO")
        res.status(500).json(users)
    }


    // users.then(function (response) {
    //     console.log(baseLog + "RETORNANDO USUARIO ")
    //     res.status(200).send(response)
    // }).catch(function (e) {
    //     console.error(baseLogError)
    //     console.error(e)
    //     res.status(500).json({error: e.message})
    // })


    // res.status(500).json({error: e.message})
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const getAll = async function (req, res, next) {
    try {
        let users = await userService.getAll()
        res.status(200).send(users)
    } catch (e) {
        console.error(e)
        res.status(500).send(e.message)
    }
}

exports.create = create
exports.findById = findById
exports.getAll = getAll
