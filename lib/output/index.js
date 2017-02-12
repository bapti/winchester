const { outputHtml } = require('./local/html')
const { outputStatsD } = require('./remote/statsD')

module.exports = { outputHtml, outputStatsD }
