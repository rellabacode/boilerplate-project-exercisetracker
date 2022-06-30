const express = require('express')
const router = express.Router()
const {userCtrl, exerciseCtrl, infoCtrl} = require("../controllers")
const path = require("path")
const scriptName = path.basename(__filename);


const API_USERS = '/users'
const FIND_USER_BY_ID = API_USERS + '/:_id'

router.post(API_USERS, userCtrl.create)
router.get(FIND_USER_BY_ID, userCtrl.findById)
router.get(API_USERS, userCtrl.getAll)
router.post(API_USERS + '/:_id/exercises', exerciseCtrl.create)

router.get("/is-mongoose-ok", infoCtrl.isMongooseOk)

module.exports = router
