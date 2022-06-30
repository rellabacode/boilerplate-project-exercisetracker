const {exerciseService} = require("../services/index.js")
const controllers = require("../controllers")
const {mongoose} = require('mongoose')
const axios = require('axios')
const {baseUrl, baseUrl2} = require('../utils/helper.util.js')
const path = require("path")
const scriptName = path.basename(__filename);

const INVALID_DATE = "Invalid Date"

/**
 * Create an user exercise. Therefore the user must exist
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.create = async function (req, res, next) {
    let baseLog = "("+scriptName+")::create exercise "
    // try {
    console.log(baseLog + new Date())

    // await controllers.userCtrl.findById(req, res).then(res => {
    //
    // })
    console.log(baseLog+"parametros body")
    console.log(req.body)

    let userId = req.body[":_id"];
    console.log(userId)

    console.log(baseLog+"buscando usuario "+baseUrl(req) + "/api/users/" + userId)
    axios.get(baseUrl2(req) + "/api/users/" + userId).then(async function (user) {
        console.log(baseLog+"res axios")
        console.log(user)

        if (user.data && user.data._id) {
            let description = req.body["description"]
            let duration = req.body["duration"]

            if (!description || !description.trim().length) next({status: 400, message: "Missing description"})
            if (!duration || isNaN(parseInt(duration))) next({status: 400, message: "Duration must be an Integer"})

            let date = new Date();
            if (req.body["date"]) date = new Date(req.body["date"]);

            console.log(baseLog+"exercise date " + date.toDateString())

            if (date.toString() === INVALID_DATE) {
                console.log(baseLog+"fecha invalida, retornando")
                next({status: 400, message: INVALID_DATE})
                // return res.status(400).json({error: INVALID_DATE})
            }

            console.log(user.data._id, description, duration, date)

            try {
                let exercise = await exerciseService.create(user.data, description, duration, date.toDateString())
                return res.status(200).send(exercise)
            } catch (e) {
                console.error(e)
                next({status: 500, message: e.message})
            }

        }
        next({status: 400, message: "Invalid User _id"})
        // return res.status(400).json({error: })

    }).catch(function (e) {
        console.error("axios error")
        console.error(e)
        return res.status(e.response.status).json({error: e.response.data})
    })

    // controllers.userCtrl.findById(req, res).then(user => {

    // }).catch(e => {
    //     console.error(e)
    //     res.status(500).send(e.message)
    // })
}

