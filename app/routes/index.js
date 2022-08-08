const express = require('express')
const router = express.Router()
const {userCtrl, exerciseCtrl, logCtrl} = require("../controllers")
const path = require("path")
const scriptName = path.basename(__filename);


const API_USERS = '/users'
const API_EXERCISES = '/exercises'
const API_DATABASE = '/database'
const FIND_USER_BY_ID = API_USERS + '/:_id'
const USER_EXERCISE_LOG = API_USERS + '/:_id/logs'

router.post(API_USERS, userCtrl.create)
router.get(FIND_USER_BY_ID, userCtrl.findById)
router.get(API_USERS, userCtrl.getAll)

router.post(API_USERS + '/:_id/exercises', exerciseCtrl.create)

router.get(USER_EXERCISE_LOG, logCtrl.userLog)

module.exports = router
