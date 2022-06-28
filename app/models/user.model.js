const  mongoose = require('mongoose')
const {Schema} =  mongoose
let userSchema = new Schema({
    username: {
        type: String,
        maxLength: 50,
        required: [true, "username is mandatory"]
    },
})
let UserModel = mongoose.model('User', userSchema)
exports.UserSchema = userSchema;
exports.UserModel = UserModel
exports.User = UserModel

