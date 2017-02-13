'use strict'

const async = require('async')
const autocannon = require('autocannon')

const { load } = require('./config')
const { output } = require('./output')

function run (title, targets, repeat, outputConfig) {
  console.log('\nFiring sequence initiated.')
  async.mapSeries(targets, (t, cb) => {
    async.mapLimit(t, 2, autocannon, (err, res) => {
      console.log(`Winchester fired ${repeat} time(s) at ${t[0].title}.`)
      cb(err, res)
    })
  }, (err, res) => {
    console.log('Firing sequence concluded, output being prepared.\n')
    if (err)  console.error(err)
    else      output(title, res, outputConfig)
  })
}

module.exports = { load, run }
