const {userService} = require("../services/index.js")
const {exerciseCtrl} = require("../controllers")
const {mongoose} = require("mongoose");
const {log} = require("debug");
const path = require("path")
const scriptName = path.basename(__filename)

module.exports.create = async function (req, res, next) {
    let baseLog = "("+scriptName+")::create user "
    console.log(baseLog+"parametros body")
    console.log(req.body)
    let username = req.body.username;
    console.log(userService)

    try {
        let user = await userService.create(username)
        res.status(201).send(user)
    } catch (e) {
        console.error(e)
        res.status(500).send(e.message)
    }
}

module.exports.getAll = async function (req, res, next) {
    try {
        let users = await userService.getAll()
        res.status(200).send(users)
    } catch (e) {
        console.error(e)
        res.status(500).send(e.message)
    }
}
/**
 * Search a document whose _id matches with the posted _id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
findById = async function (req, res, next) {
    console.log("user.controller::findById" + new Date())
    try {
        let idMongoose = new mongoose.Types.ObjectId(req.params["_id"])
    } catch (e) {
        console.error(e)
        console.error(e.message)
        console.error("paco")
        // console.error(e.request.data)
        return res.status(400).send(e.message)
    }

    try {
        console.log("user.controller::findById param id "+req.params["_id"] + new Date())
        let users = await userService.findById(req.params["_id"])
        // console.log("user.controller::findById RETORNANDO USUARIO " + users)
        res.status(200).send(users)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
}

exports.findById = findById