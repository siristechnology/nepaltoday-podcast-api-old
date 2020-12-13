require('dotenv').config()
const Agenda = require('agenda')

const crawler = require('./../podCastCrawler')

module.exports = async function () {
    const agenda = new Agenda({db: {address: 'mongodb://localhost:27017/mind-cast-tests'}})

    agenda.define('crawl podcasts', async (job) => {
        console.log('crawl podcasts job started')
        crawler()
    })

    await agenda.start()

    await agenda.every('5 minutes', 'crawl podcasts')
}