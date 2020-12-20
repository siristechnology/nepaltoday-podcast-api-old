require('dotenv').config()
const Agenda = require('agenda')

const crawler = require('./../podCastCrawler')

module.exports = async function () {
    const agenda = new Agenda({ db: { address: process.env.DATABASE_URL } })

    agenda.define('crawl podcasts', async (job) => {
        console.log('crawl podcasts job started')
        crawler()
    })

    await agenda.start()

    await agenda.every('3 hours', 'crawl podcasts')
}