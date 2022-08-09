const {ExerciseModel} = require('../models/index.js')
const {Schema} = require("mongoose");
const {UserModel, User} = require("../models/user.model");
const path = require("path")
const scriptName = path.basename(__filename)

const create = (username, description, duration, date) => {
    let baseLog = "(" + scriptName + ")::create exercise "
    let baseLogError = "(" + scriptName + "):: " + arguments.callee.name + " ERROR "
    return new Promise(async function (resolve, reject) {
        console.log(baseLog + " user " + username)

        const exercise = new ExerciseModel({
            username: username,
            description: description,
            duration: duration,
            date: date
        })

        console.log(baseLog + "exercise to persist")
        // console.log(exercise)

        try {
            let saved = await exercise.save()
            console.log(baseLog + "exercise saved")
            // console.log(saved)

            let newExercise = await ExerciseModel.findById(saved._id).select("-__v").exec()

            console.log(baseLog + "exercise modified to return")
            console.log(newExercise)
            console.log(newExercise.constructor)
            console.log(newExercise.date)
            // console.log(newExercise.date.toDateString())

            if (newExercise) {
                newExercise.date = new Date(newExercise.date).toDateString()
                // newExercise.date = newExercise.date.toDateString()
                resolve(newExercise)
            }

            reject({status: 500, message: "Unknown error saving exercise"})
            // console.log("ejercicio creado")
            // console.log(newExercise)

        } catch (e) {
            console.error(baseLogError)
            console.error(e.errmsg)
            console.error(e.code)

            reject({status: 500, message: "Error creating user exercise"})
        }
    })
}

const deleteAll = () => {
    let baseLog = "(" + scriptName + ")::delete all "
    console.log(baseLog)
    return new Promise(async function (resolve, reject) {

        try {
            let newExercise = await ExerciseModel.remove({}).exec()
            resolve(newExercise)
        } catch (e) {
            console.error(e)
            reject(e.message)
        }
    })
}

module.exports = {
    create,
    deleteAll
}