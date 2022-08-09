const isdateyyysepmmsepdd = function (date) {
    const dateRe = /\d{4}\-\d{2}-\d{2}/g
    if (!dateRe.exec(date) || new Date(date).toString() === "Invalid Date") return false
    return true
}

const dateyyysepmmsepdd = function () {
    let dateTemp = new Date()
    return dateTemp.getFullYear()
        + "-" + (dateTemp.getMonth() + 1) + "-" + dateTemp.getDate()
}


module.exports = {
    isdateyyysepmmsepdd,
    dateyyysepmmsepdd
}