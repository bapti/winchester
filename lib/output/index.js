'use strict'

const { outputHtml } = require('./local/html')
const { outputStatsD } = require('./remote/statsD')

const output = (title, results, config) => {
  if (config) {
    if (config.local)   outputHtml(title, results, config.local)
    if (config.statsd)  outputStatsD(title, results, config.statsD)
  }
}

module.exports = { output }
