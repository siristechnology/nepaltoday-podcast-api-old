const SourceConfig = require('./../../config/podcast-source-config.json')
const PodcastCrawler = require('news-crawler')
const uploadHelper = require('./uploadHelper')
const { checkPodcastByOriginalLink, create } = require('../../dao/PodcastDAO')
const getPodcastDuration = require('./getPodcastDuration')

module.exports = async function () {

    try {
        let podcasts = await PodcastCrawler(SourceConfig, {headless: true, articleUrlLength: 10})
        for(const podcast of podcasts){
            const podcastSaved = await checkPodcast(podcast.audioUrl)
            if(!podcastSaved){
                const s3Response = await uploadHelper(podcast)
                if(s3Response.success){
                    const duration = await getPodcastDuration(podcast.audioUrl)
                    console.log(duration)
                    await savePodcasttoDatabase(podcast, s3Response.response, duration)
                }
            }
        }
    } catch (error) {   
        console.log(error)
    }
}

const checkPodcast = async (link) => {
    const podcastRes = await checkPodcastByOriginalLink(link)
    return podcastRes
}

const savePodcasttoDatabase = async (podcast, s3Response, duration) => {
    const podcastObj = {
        author: podcast.sourceName,
        title: podcast.title,
        description: podcast.excerpt,
        imageURL: podcast.imageLink,
        thumbnailImageURL: podcast.imageLink,
        originalAudioLink: podcast.audioUrl,
        link: podcast.link,
        audioLink: s3Response.Location,
        duration: duration.duration,
        durationInSeconds: duration.durationInSeconds
    }

    await create(podcastObj)
    
}