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
		const podcasts = (await Podcast.find()).flat()
		const podcastList = podcasts.map(podcast=>{
			const mySource = SourceConfig.find(x=> x.sourceName==podcast.author)
			console.log(podcast)
			let myPodcast = podcast
			console.log(myPodcast)
			myPodcast.author = {
				name: mySource.sourceName,
				profileImageURL: mySource.profileImageURL,
				thumbnailProfileImageURL: mySource.thumbnailProfileImageURL
			}
			console.log(myPodcast.author)
			return myPodcast
		})
		// console.log(podcastList)
		return podcastList
	} catch (err) {
		throw err
	}
}

exports.readById = async (id) => {
	try {
		return await Podcast.findById(id).populate('author')
	} catch (err) {
		throw err
	}
}

exports.readByCategory = async (category) => {
	try {
		return await Podcast.find({ category }).populate('author')
	} catch (err) {
		throw err
	}
}

exports.filterByCategory = async (categories) => {
	try {
		return await Podcast.find({ category: { $in: categories } }).populate('author')
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
