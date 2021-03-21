const SourceConfig = require('../config/podcast-source-config.json')

exports.read = async (req, res, next) => {
	try {
		let programs = []
		SourceConfig.forEach((source) => {
			const currentPrograms = source.pages.map((page) => {
				return {
					name: page.program,
					category: page.category,
					sourceName: source.sourceName,
					imageUrl: process.env.SERVER_BASE_URL + source.profileImageURL,
				}
			})
			programs = programs.concat(currentPrograms)
		})

		return res.status(200).send(programs)
	} catch (err) {
		next(err)
	}
}
