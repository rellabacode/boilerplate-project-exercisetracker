const {UserModel, ExerciseModel} = require("../models");
const path = require("path")
const scriptName = path.basename(__filename)

genUserLog = async function (user, from, to, limit) {
    let baseLog = "(" + scriptName + ")::create exercise "
    let baseLogError = "(" + scriptName + "):: " + arguments.callee.name + " ERROR "
    console.log(baseLog + " user " + user.username)
    console.log(baseLog + " from " + from)
    console.log(baseLog + " to " + to)
    console.log(baseLog + " limit " + limit)
    let exercisesQuery = null

    if (from) {
        exercisesQuery = ExerciseModel.find({date: {$gte: from}})
    }

    if (to) {
        if (exercisesQuery)
            exercisesQuery = exercisesQuery.find({date: {$lte: to}})
        else
            exercisesQuery = ExerciseModel.find({date: {$lte: to}})
    }

    if (exercisesQuery)
        // exercisesQuery = exercisesQuery.sort([['date', "descending"]])
        exercisesQuery = exercisesQuery.sort({date: -1})
    else
        exercisesQuery = ExerciseModel.find().sort({date: -1})

    if (limit) {
        exercisesQuery = exercisesQuery.limit(limit)
    }

    let exercises = exercisesQuery.find({username: user.username})
        .select("-__v").select("-_id").select("-username");

    console.log(baseLog + exercises.toString())

    try {
        exercises = await exercises.exec()
        console.log(baseLog + " exercises rec ")
        console.log(exercises)
        return {
            username: user.username, count: exercises.length, _id: user._id,
            log: exercises.map(exercise => {
                console.log(exercise)
                exercise.date = new Date(exercise.date).toDateString()
                return exercise
            })
        }
    } catch (e) {
        console.error(e)
    }
    // let log = await ExerciseModel.remove({}).exec()
}

module.exports = {
    genUserLog
}