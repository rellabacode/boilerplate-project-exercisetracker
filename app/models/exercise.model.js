const mongoose = require('mongoose')
const {Schema} = mongoose

let exerciseSchema = new Schema({
    username: {
        type: String,
        maxLength: 50,
        required: [true, "username is mandatory"]
    },
    description: {
        type: String,
        maxLength: 100,
        required: [true, "description is mandatory"]
    },
    duration: {
        type: Number,
        min: 0,
        required: [true, "duration is mandatory"]
    },
    date: {
        type: String,
        required: true
    }
})

let ExerciseModel = mongoose.model('Exercise', exerciseSchema)
exports.ExerciseModel = ExerciseModel
exports.Exercise = ExerciseModel

