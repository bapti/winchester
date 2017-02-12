'use strict'

const async = require('async')
const autocannon = require('autocannon')

const { load } = require('./config')
const { outputHtml, outputStatsD } = require('./output/')

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
  if (output.statsd)  outputStatsD(title, results, output.statsD)
}

module.exports = { load, run }
