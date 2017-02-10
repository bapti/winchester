'use strict'

const load = require('./config')

const async = require('async')
const autocannon = require('autocannon')
const graphMaker = require('./graphMaker')
const statsdLogger = require('./statsdLogger')

function run (targets, output) {
  async.mapSeries(targets, (t, cb) => {
    async.mapLimit(t, 2, autocannon, (err, res) => {
      cb(err, res)
    })
  }, (err, res) => {
    if (err) console.error(err)
    else handleOutput(res, output)
  })
}

const handleOutput = (results, output) => {
  if (output.local) graphMaker.graph(results, output.local.outputPath)
  statsdLogger.logToStatsd(output.statsd, results)
}

module.exports = { load, run }
