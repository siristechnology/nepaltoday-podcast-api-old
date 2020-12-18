const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then((res) => {
	console.log('database connected')
})

mongoose.Promise = global.Promise

module.exports = mongoose
