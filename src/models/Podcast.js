const checkCategoriesValid = require('../utils/checkCategoriesValid')
const mongoose = require('../db')

const PodcastSchema = mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	program: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageURL: {
		type: String,
		required: true,
	},
	thumbnailImageURL: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		// required: true,
	},
	stars: {
		type: Number,
		// required: true,
	},
	duration: {
		type: String,
		// required: true,
	},
	durationInSeconds: {
		type: Number,
		// required: true,
	},
	fileName: {
		type: String,
		// required: true,
	},
	originalAudioLink: {
		type: String,
		required: true,
		unique: true
	},
	link: {
		type: String,
		required: true
	},
	audioLink: {
		type: String,
		required: true
	},
	createdDate: { 
		type: Date, 
		default: Date.now 
	},
})

PodcastSchema.set('toJSON', {
	transform(_doc, returned) {
		const returnedDocument = JSON.stringify(returned)
		const document = JSON.parse(returnedDocument)

		document.id = returned._id

		delete document._id
		delete document.__v

		return document
	},
})

module.exports = mongoose.model('Podcast', PodcastSchema)
