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
	apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
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
