const {exerciseService} = require("../services/index.js")
const controllers = require("../controllers")
const {mongoose} = require('mongoose')
const axios = require('axios')
const {baseUrl, baseUrl2} = require('../utils/helper.util.js')


const INVALID_DATE = "Invalid Date"

/**
 * Create an user exercise. Therefore the user must exist
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.create = async function (req, res, next) {
    // try {
    console.log("exercise.controller::create exercise" + new Date())

    // await controllers.userCtrl.findById(req, res).then(res => {
    //
    // })
    console.log("req axios")
    console.log(req.body)

    let userId = req.body[":_id"];
    console.log(userId)


    axios.get(baseUrl(req) + "/api/users/" + userId).then(async function (user) {
        console.log("--------exercise.controller--  res axios")
        console.log(user)

        if (user.data && user.data._id) {
            let description = req.body["description"]
            let duration = req.body["duration"]

            if (!description || !description.trim().length) return res.status(400).json({error: "Missing description"})
            if (!duration || isNaN(parseInt(duration))) return res.status(400).json({error: "Duration must be an Integer"})

            let date = new Date();
            if (req.body["date"]) date = new Date(req.body["date"]);

            console.log("exercise date " + date.toDateString())
            console.log(date.toString() === INVALID_DATE)

            if (date.toString() === INVALID_DATE) {
                console.log("fecha invalida, retornando")
                next({status: 400, message: INVALID_DATE})
                // return res.status(400).json({error: INVALID_DATE})
            }

            console.log("fecha valida")
            console.log(user.data._id, description, duration, date)

            try {
                let exercise = await exerciseService.create(user.data, description, duration, date.toDateString())
                return res.status(200).send(exercise)
            } catch (e) {
                console.log(e)
                return res.status(500).json({error: e.message})
            }

        }
        return res.status(400).json({error: "Invalid User _id"})

    }).catch(function (e) {
        console.log("axios error")
        return res.status(e.response.status).json({error: e.response.data})
    })

    // controllers.userCtrl.findById(req, res).then(user => {

    // }).catch(e => {
    //     console.error(e)
    //     res.status(500).send(e.message)
    // })
}

