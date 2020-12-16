require('dotenv').config()
const Agenda = require('agenda')
const { DATABASE_URL } = require('../../config/environment')

const crawler = require('./../podCastCrawler')

module.exports = async function () {
    const agenda = new Agenda({db: {address: DATABASE_URL}})

    agenda.define('crawl podcasts', async (job) => {
        console.log('crawl podcasts job started')
        crawler()
    })

    await agenda.start()

    await agenda.every('20 hours', 'crawl podcasts')
}