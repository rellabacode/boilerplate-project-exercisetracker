const {baseUrl, baseUrl2, isDebug} = require("../utils/helper.util");
const axios = require("axios");
const {logService, exerciseService} = require("../services");
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

    let from = req.params

    console.log(baseLog + "searching for user " + baseUrl(req) + "/api/users/" + userId)

    try {
        const user = await axios.get(baseUrl2(req) + "/api/users/" + userId, {
            headers: {
                'user-agent': 'not axios',
            }
        })
        console.log(baseLog + "res axios")
        console.log(user.data)

        if (user.data && user.data._id) {
            const exercise = await logService.create(user.data, description, duration, date.toDateString())
            return res.status(200).send(exercise)
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