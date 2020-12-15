const getPodcastDurationInSeconds = require("./getPodcastDurationInSeconds")

module.exports = async (file) => {
	const durationInSeconds = await getPodcastDurationInSeconds(file)

	const currentTime = Math.floor(Number(durationInSeconds))

	const currentTimeInMinutes = Math.floor(currentTime / 60)
	const currentTimeInSeconds = currentTime % 60

	let minutes = '00'
	let seconds = '00'

	if (currentTimeInMinutes > 9) {
		minutes = currentTimeInMinutes
	}

	if (currentTimeInMinutes >= 1 && currentTimeInMinutes <= 9) {
		minutes = `0${currentTimeInMinutes}`
	}

	if (currentTimeInSeconds > 9 && currentTimeInSeconds <= 59) {
		seconds = currentTimeInSeconds
	}

	if (currentTimeInSeconds >= 1 && currentTimeInSeconds <= 9) {
		seconds = `0${currentTimeInSeconds}`
	}

	let duration = `${minutes}:${seconds}`
	return {
		duration,
		durationInSeconds
	}
}
