const {ExerciseModel} = require('../models/index.js')
const {Schema} = require("mongoose");
const {UserModel, User} = require("../models/user.model");
const path = require("path")
const scriptName = path.basename(__filename)

const create = (user, description, duration, date) => {
    let baseLog = "(" + scriptName + ")::create exercise "
    return new Promise(async function (resolve, reject) {
        console.log(baseLog+"id usuario " + user._id)

        const exercise = new ExerciseModel({
            username: user.username,
            description: description,
            duration: duration,
            date: date
        })

        console.log(exercise)

        try {
            let saved = await exercise.save()
            console.log(saved)

            let newExercise = await ExerciseModel.findById(saved._id).select("-__v").exec()

            console.log(newExercise)

            if (newExercise) {
                newExercise.date = new Date(newExercise.date).toDateString()
                resolve(newExercise)
            }

            reject("Unknown error saving exercise")
            // console.log("ejercicio creado")
            // console.log(newExercise)

        } catch (e) {
            console.error(e)
            reject(e.message)
        }
    })
}

module.exports = {
    create
}