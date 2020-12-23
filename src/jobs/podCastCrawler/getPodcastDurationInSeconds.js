const mp3Duration = require('mp3-duration')
const { promisify } = require('util')
const request = require('request-promise')

module.exports = async (file) => {
	try {
		const options = {
			uri: file,
			encoding: null
		};

		const fileBuffer = await request(options)
		const getDuration = promisify(mp3Duration)
		const duration = await getDuration(fileBuffer)
		return Math.ceil(duration)
	} catch (err) {
		console.log("err", err)
		throw err
	}
}
