'use strict'

const { load } = require('./config')
const { outputHtml } = require('./output/local/html')

const async = require('async')
const autocannon = require('autocannon')
const graphMaker = require('./graphMaker')
const statsdLogger = require('./statsdLogger')

function run (title, targets, repeat, output) {
  console.log('\nFiring sequence initiated.')
  async.mapSeries(targets, (t, cb) => {
    async.mapLimit(t, 2, autocannon, (err, res) => {
      console.log(`Winchester fired ${repeat} time(s) at ${t[0].title}.`)
      cb(err, res)
    })
  }, (err, res) => {
    console.log('Firing sequence concluded, output being prepared.\n')
    if (err) console.error(err)
    else handleOutput(title, res, output)
  })
}

const handleOutput = (title, results, output) => {
  if (output.local)   outputHtml(title, results, output.local)
  if (output.statsd)  statsdLogger.logToStatsd(output.statsd, results)
}

module.exports = { load, run }
