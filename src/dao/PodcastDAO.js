const mongoose = require('mongoose')

const PodcastModel = require('../models/Podcast')

const Podcast = mongoose.model('Podcast')
const SourceConfig = require('./../config/podcast-source-config.json')

exports.create = async (data) => {
	try {
		const podcast = new Podcast(data)
		return await podcast.save()
	} catch (err) {
		throw err
	}
}

exports.read = async () => {
	try {
		const podcasts = await Podcast.find().sort({ _id: -1}).limit(30)
		let podcastList = podcasts.map(podcast=>{
			const mySource = SourceConfig.find(x=> x.sourceName==podcast.author)
			let author = {
				name: mySource.sourceName,
				profileImageURL: process.env.SERVER_BASE_URL + mySource.profileImageURL,
				thumbnailProfileImageURL: process.env.SERVER_BASE_URL + mySource.thumbnailProfileImageURL
			}
			let id = podcast._id;
			return {...podcast._doc, author, id }
		})
		return podcastList
	} catch (err) {
		throw err
	}
}

exports.readById = async (id) => {
	try {
		return await Podcast.findById(id)
	} catch (err) {
		throw err
	}
}

exports.readByCategory = async (category) => {
	try {
		return await Podcast.find({ category })
	} catch (err) {
		throw err
	}
}

exports.filterByCategory = async (categories) => {
	try {
		return await Podcast.find({ category: { $in: categories } })
	} catch (err) {
		throw err
	}
}

exports.checkPodcastByOriginalLink = async (originalAudioLink) => {
	try {
		const podcastRes = await Podcast.findOne({originalAudioLink})
		if(podcastRes && podcastRes.link){
			return true
		}else{
			return false
		}
	} catch(err) {
		throw err
	}
}

exports.filterByProgram = async (program) => {
	try{
		const podcasts = await Podcast.find({program}).sort({_id: -1}).limit(30)
		let podcastList = podcasts.map(podcast=>{
			const mySource = SourceConfig.find(x=> x.sourceName==podcast.author)
			let author = {
				name: mySource.sourceName,
				profileImageURL: process.env.SERVER_BASE_URL + mySource.profileImageURL,
				thumbnailProfileImageURL: process.env.SERVER_BASE_URL + mySource.thumbnailProfileImageURL
			}
			let id = podcast._id;
			return {...podcast._doc, author, id }
		})
		return podcastList
	} catch(err){
		throw err
	}
}
