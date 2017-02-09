'use strict'

const path = require('path')

const load = require('./config')

const async = require('async')
const autocannon = require('autocannon')
const graphMaker = require('./graphMaker')
const statsdLogger = require('./statsdLogger')

function fire(timesToFire, targets, output, targetingPath) {
  console.log(`Lining up ${targets.length} target${targets.length > 1 ? 's' : ''}`)
  const rows = targets

  console.log(targets)

  console.log('Firing now')
  async.mapSeries(rows, (row, seriesCB) => {
    async.mapLimit(row, 2, autocannon, (rowErr, rowResults) => {
      seriesCB(rowErr, rowResults)
    })
  }, (rowsErr, rowsResults) => {
    console.log('Firing sequence complete')
    if(rowsErr) {
      console.error(rowsErr)
    } else {
      const outputRoot = path.dirname(targetingPath)
      if(output.local) graphMaker.graph(rowsResults, outputRoot)
      statsdLogger.logToStatsd(output.statsd, rowsResults)
    }
  })
}

const winchester = {
  aim: load,
  fire: fire
}

module.exports = winchester
