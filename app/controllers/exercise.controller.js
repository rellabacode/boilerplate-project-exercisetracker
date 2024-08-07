const {exerciseService} = require("../services/index.js")
const controllers = require("../controllers")
const {mongoose} = require('mongoose')
const axios = require('axios')
const {baseUrl, baseUrl2, isDebug} = require('../utils/helper.util.js')

const path = require("path")
const {UserModel} = require("../models/user.model");
const scriptName = path.basename(__filename);

const {isdateyyysepmmsepdd, dateyyysepmmsepdd} = require("../utils/helper.date")
const {ObjectId} = require("mongodb");
const {userDb} = require("../db");
const INVALID_DATE = "Invalid Date"

/**
 * Create an user exercise. Therefore the user must exist
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const create = async function (req, res, next) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "
    let baseLogError = "(" + scriptName + "):: " + arguments.callee.name + " ERROR "
    // try {
    console.log(baseLog)

    // await controllers.userCtrl.findById(req, res).then(res => {
    //
    // })
    // console.log(baseLog + "body parameters")
    // console.log(req.body)
    // console.log(req.url)
    // console.log(req.params[":_id"])
    // console.log(req.params)

    let userId = req.params["_id"];
    console.log("userId " + userId)

    if (!userId || !userId.trim().length) return next({status: 400, message: "Missing :_id param"})

    try {
        const user = await axios.get(baseUrl2(req) + "/api/users/" + userId, {
            headers: {
                'user-agent': 'not axios',
            }
        }).catch(function (error) {
            console.error(baseLogError + error.message)
            return next({status: 400, message: error.message})
        })

        console.log(baseLog + "res axios ok? " + !!(user && user.data && user.data._id))

        if (user && user.data && user.data._id) {
            let exerciseid = req.body[":_id"]
            if (exerciseid) {
                try {
                    let valid = new ObjectId(exerciseid)
                } catch (e) {
                    console.error(baseLogError)
                    return next({status: 400, message: "Wrong object :_id"})
                }
            } else {
                exerciseid = undefined
            }

            console.log(baseLog + "searching for user " + baseUrl(req) + "/api/users/" + userId)
            let description = req.body["description"]
            let duration = req.body["duration"]

            if (!description || !description.trim().length) next({status: 400, message: "Missing description"})
            if (!duration || isNaN(parseInt(duration))) next({status: 400, message: "Duration must be an Integer"})

            let date = undefined
            if (req.body["date"] && (!isdateyyysepmmsepdd(req.body["date"]) || new Date(req.body["date"]).toString() === INVALID_DATE)) {
                console.log(baseLog + "invalid date, returning")
                return next({status: 400, message: INVALID_DATE})
            } else if (req.body["date"]) {
                date = req.body["date"]
            } else {
                date = dateyyysepmmsepdd()
            }

            console.log(baseLog + "exercise date " + date)
            // try {
            //
            //
            // } catch (e) {
            //     console.error(baseLogError)
            //     console.error(e)
            //
            //     return res.status(e.response.status).json({error: e.response.data})
            // }

            // controllers.userCtrl.findById(req, res).then(user => {

            // }).catch(e => {
            //     console.error(e)
            //     res.status(500).send(e.message)
            // })

            console.log(user.data._id, description, duration, date)
            const exercise = await exerciseService.create(exerciseid, user.data, description, duration, date)
            return res.status(200).send(exercise)
        }

        next({status: 400, message: "Invalid User _id"})

    } catch (error) {
        console.error(baseLogError)
        console.error(error)
    }
}


/**
 * Delete all exercise instances
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteAll = async function (req, res, next) {
    let baseLog = "(" + scriptName + ")::delete all "
    console.log(baseLog + new Date())

    try {
        let exercise = await exerciseService.deleteAll()
        return res.status(200).send(exercise)
    } catch (e) {
        console.error(e)
        next({status: 500, message: e.message})
    }
}

exports.create = create
exports.deleteAll = deleteAll
