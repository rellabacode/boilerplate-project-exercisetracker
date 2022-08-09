const {baseUrl, baseUrl2, isDebug} = require("../utils/helper.util");
const axios = require("axios");
const {logService, exerciseService} = require("../services");
const {isdateyyysepmmsepdd} = require("../utils/helper.date")

const moment =  require("moment")

const path = require('path')
const scriptName = path.basename(__filename)

/**
 * Return a json object with user activity log
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const userLog = async function (req, res, next) {
    let baseLog = "(" + scriptName + "):: " + arguments.callee.name + " "
    let baseLogError = "(" + scriptName + "):: " + arguments.callee.name + " ERROR "
    console.log(baseLog)

    let userId = req.params._id
    if (!userId || !userId.trim().length) next({status: 400, message: "Missing :_id"})

    console.log(baseLog + req.params)

    let from = req.query.from
    let fromDate = undefined
    if (from) {
        if (!isdateyyysepmmsepdd(from) || new Date(from).toString() === "Invalid Date")
            next({status: 400, message: "Invalid from date range"})
        fromDate = from
    }

    let to = req.query.to
    let toDate = undefined
    if (to) {
        if (!isdateyyysepmmsepdd(to) || new Date(to).toString() === "Invalid Date")
            next({status: 400, message: "Invalid to date range"})
        toDate = to
    }

    if (moment(fromDate).isAfter(toDate))
        next({status: 400, message: "To date cannot be previous that From date"})

    let limit
    if (req.query.limit) {
        limit = parseInt(req.query.limit)
        if (isNaN(limit))
            next({status: 400, message: "Limit must be an integer"})
    }

    console.log(baseLog + "searching for user " + baseUrl(req) + "/api/users/" + userId)

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
            const log = await logService.genUserLog(user.data, fromDate, toDate, limit)
            return res.status(200).send(log)
        }

        next({status: 400, message: "Invalid User _id"})

    } catch (error) {
        console.error(baseLogError)
        console.error(error)
    }

}

module.exports = {
    userLog
}