const {UserModel, ExerciseModel} = require("../models");
genUserLog = async function (userId) {
    return new Promise(async function (resolve, reject) {
        try {



            let user = await UserModel.findById(userId).select("-__v").exec()
            let exercises = await ExerciseModel.find({username: user.username}).exec()

            console.log(exercises)



            // let log = await ExerciseModel.remove({}).exec()
            resolve(newExercise)
        } catch (e) {
            console.error(e)
            reject(e.message)
        }
    })
}

module.exports = {
    genUserLog
}