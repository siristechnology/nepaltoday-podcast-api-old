const handleControllerError = require('../utils/handleControllerError')
const shuffleArray = require('../utils/shuffleArray')
const AuthorDAO = require('../dao/AuthorDAO')
const PodcastDAO = require('../dao/PodcastDAO')
const PodcastSource = require('./../config/podcast-source-config.json')
const Podcast = require('../models/Podcast')

exports.filterByProgram = async (req,res, next) => {
	try{
		const { program } = req.params;
		const author = PodcastSource.find(x=>{
			let checkSource = x.pages.filter(x=>x.program==program)
			if(checkSource.length) return true
		})
		const podcasts = await PodcastDAO.filterByProgram(program)
		
		if (!author) {
			return res.status(404).send({
				message: 'Author not found',
			})
		}
		
		const result = {
			name: author.name,
			profileImageURL: author.profileImageURL,
			thumbnailProfileImageURL: author.thumbnailProfileImageURL,
			podcasts
		}

		return res.status(200).send({ author: result })
	} catch (err) {
		next(err)
	}
}

exports.searchByProgram = async (req, res, next) => {
	try {
		const { name } = req.params;
		let programs = []
		for(const x of PodcastSource){
			let pages = x.pages.filter(y=>(new RegExp(name, "i")).test(y.programInEnglish))
			for(const page of pages){
				const podcastNumber = await Podcast.count({author: x.sourceName, program: page.program})
				podcastNumber>0 && programs.push({
					name: x.sourceName,
					program: page.program,
					podcastNumber,
					profileImageURL: process.env.SERVER_BASE_URL + x.profileImageURL 
				})
			}
		}
		programs = programs.slice(0, 30)

		return res.status(200).send({programs})
	} catch (err) {
		next(err)
	}
} 

exports.create = async (req, res, next) => {
	try {
		const { id } = await AuthorDAO.create(req.body)

		return res.status(201).send({
			id,
		})
	} catch (err) {
		handleControllerError(err, next)
	}
}

exports.read = async (_req, res, next) => {
	try {
		const authors = await AuthorDAO.read()

		return res.status(200).send({ authors })
	} catch (err) {
		next(err)
	}
}

exports.readById = async (req, res, next) => {
	try {
		const { id } = req.params

		const author = await AuthorDAO.readById(id)

		if (!author) {
			return res.status(404).send({
				message: 'Author not found',
			})
		}

		const authorsFilteredByCategory = await AuthorDAO.filterByCategory(author.categories, author.id)

		const getPodcasts = ({ podcasts, name }) => {
			const podcastsSelected = shuffleArray(podcasts)
				.slice(0, 5)
				.map((podcast) => ({
					...podcast,
					id: podcast._id,
					author: {
						name,
					},
				}))

			return podcastsSelected
		}

		const authorData = author.toObject()

		const result = {
			...authorData,
			relatedAuthors: shuffleArray(authorsFilteredByCategory).slice(0, 5),
			podcasts: {
				newReleases: getPodcasts(authorData),
				featured: getPodcasts(authorData),
			},
		}

		return res.status(200).send({ author: result })
	} catch (err) {
		next(err)
	}
}

exports.update = async (req, res, next) => {
	try {
		const { id } = req.params

		const author = await AuthorDAO.update(id, { ...req.body })

		if (!author) {
			return res.status(404).send({ message: 'Author not found' })
		}

		return res.status(200).send({ author })
	} catch (err) {
		next(err)
	}
}

exports.delete = async (req, res, next) => {
	try {
		const { id } = req.params

		const author = await AuthorDAO.delete(id)

		if (!author) {
			return res.status(404).send({ message: 'Author not found' })
		}

		return res.status(204).send()
	} catch (err) {
		next(err)
	}
}

exports.filterByName = async (req, res, next) => {
	try {
		const { name } = req.query

		if (!name) {
			return res.status(400).send({ message: "The filter 'name' is required." })
		}

		const authors = await AuthorDAO.filterByName(name)

		return res.status(200).send({ authors })
	} catch (err) {
		next(err)
	}
}
