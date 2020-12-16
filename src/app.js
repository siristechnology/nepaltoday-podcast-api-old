const bodyParser = require('body-parser')
const express = require('express')
const multer = require('multer')
const path = require('path')

const firebase = require('firebase/app')

const app = express()

const routeNotFound = require('./middlewares/routeNotFound')
const errorHandler = require('./middlewares/errorHandler')

const startJobs = require('./jobs/jobRunner/start-jobs')

const firebaseConfig = {
	apiKey: "AIzaSyDBFabjvkxIQbTbLVxqQy6UyYrjqAK_NDs",
    authDomain: "nepaltoday-podcast-beta.firebaseapp.com",
    projectId: "nepaltoday-podcast-beta",
    storageBucket: "nepaltoday-podcast-beta.appspot.com",
    messagingSenderId: "63417643973",
    appId: "1:63417643973:web:09443a094c2e67781511ac",
    measurementId: "G-0EDJ5S6WNQ"
}

firebase.initializeApp(firebaseConfig);

const getMulterDestPath = () => {
	let rootTemp = `${__dirname}/temp`

	if (process.env.NODE_ENV === 'test') {
		const [rootPath] = __dirname.split('src')
		rootTemp = `${rootPath}__tests__${path.sep}temp`
	}

	return rootTemp
}

global.__multerDestPath = getMulterDestPath()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: global.__multerDestPath }).single('file'))

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.use('/assets', express.static('assets'))

app.use('/nepaltoday-podcast/api/v1', require('./routes'))

app.use(routeNotFound)

app.use(errorHandler)

startJobs()

module.exports = app
