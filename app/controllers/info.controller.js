let mongoose;
try {
    mongoose = require('mongoose')
} catch (e) {
    console.error(e)
}

module.exports.isMongooseOk = async function (req, res, next) {
    if (mongoose) {
        res.json({isMongooseOk: !!mongoose.connection.readyState});
    } else {
        res.json({isMongooseOk: false});
    }
}