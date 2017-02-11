'use strict'

const { load } = require('./config')
const { outputHtml } = require('./output/local/html')

const async = require('async')
const autocannon = require('autocannon')
const graphMaker = require('./graphMaker')
const statsdLogger = require('./statsdLogger')

function run (title, targets, output) {
  async.mapSeries(targets, (t, cb) => {
    async.mapLimit(t, 2, autocannon, (err, res) => {
      cb(err, res)
    })
  }, (err, res) => {
    if (err) console.error(err)
    else handleOutput(title, res, output)
  })
}

const handleOutput = (title, results, output) => {
  if (output.local)   outputHtml(title, results, output.local)
  if (output.statsd)  statsdLogger.logToStatsd(output.statsd, results)
}

module.exports = { load, run }
