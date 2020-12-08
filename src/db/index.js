const mongoose = require('mongoose')
const { DATABASE_URL } = require('../config/environment')

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }).then(res=>{
    console.log("database connected")
})

mongoose.Promise = global.Promise

module.exports = mongoose
