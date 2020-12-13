const SourceConfig = require('./../../config/podcast-source-config.json')
const PodcastCrawler = require('news-crawler')
const uploadHelper = require('./uploadHelper')

module.exports = async function () {

    try {
        let podcasts = await PodcastCrawler(SourceConfig, {headless: true})
        for(const podcast of podcasts){
            const s3Response = await uploadHelper(podcast)
            console.log(s3Response)
        }
    } catch (error) {   
        console.log(error)
    }

}