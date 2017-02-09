'use strict'

const path = require('path')

const load = require('./config')

const async = require('async')
const autocannon = require('autocannon')
const graphMaker = require('./graphMaker')
const statsdLogger = require('./statsdLogger')

function fire(targets, output, configPath) {





  async.mapSeries(targets, (target, seriesCB) => {
    async.mapLimit(target, 2, autocannon, (targetErr, targetResults) => {
      seriesCB(targetErr, targetResults)
    })
  }, (targetsErr, targetsResults) => {
    if(targetsErr) {
      console.error(targetsErr)
    } else {
      const outputRoot = path.dirname(configPath)
      if(output.local) graphMaker.graph(targetsResults, outputRoot)
      statsdLogger.logToStatsd(output.statsd, targetsResults)
    }
  })
}

const winchester = {
  aim: load,
  fire: fire
}

module.exports = winchester
