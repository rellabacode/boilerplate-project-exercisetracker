const express = require('express')
const router = express.Router()
const {userCtrl, exerciseCtrl} = require("../controllers")
const path = require("path")

router.get('/', (req,
                 res) => {
    res.sendFile(path.resolve(__dirname + '/../views/index.html'))
})

const API_USERS = '/api/users'
const FIND_USER_BY_ID = API_USERS+'/:_id'

router.post(API_USERS, userCtrl.create)
router.get(FIND_USER_BY_ID, userCtrl.findById)
router.get(API_USERS, userCtrl.getAll)
router.post(API_USERS+'/:_id/exercises', exerciseCtrl.create)
module.exports = router
