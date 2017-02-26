'use strict'

const async = require('async')
const autocannon = require('autocannon')

const load = require('./config')
const output = require('./output')

function run (title, targets, repeat, outputConfig) {
  /* eslint-disable no-console */
  console.log('\nFiring sequence initiated.')
  /* eslint-enable no-console */

  async.mapSeries(targets, (t, cb) => {
    async.mapLimit(t, 2, autocannon, (err, res) => {
      /* eslint-disable no-console */
      console.log(`Winchester fired ${repeat} time(s) at ${t[0].title}.`)
      /* eslint-enable no-console */

      cb(err, res)
    })
  }, (err, res) => {
    /* eslint-disable no-console */
    console.log('Firing sequence concluded, output being prepared.\n')
    /* eslint-enable no-console */

    if (err) {
      /* eslint-disable no-console */
      console.error(err)
      /* eslint-enable no-console */
    } else {
      output(title, res, outputConfig)
    }
  })
}

module.exports = { load, run }
