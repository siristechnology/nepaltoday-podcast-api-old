const express = require('express')

const ProgramsController = require('../controllers/ProgramsController')

const router = express.Router()

router.get('/', ProgramsController.read)

module.exports = router
