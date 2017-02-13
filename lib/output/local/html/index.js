'use strict'

const fs = require('fs')
const path = require('path')

const { build404, buildGraph, buildIndex } = require('./pageBuilder')
const { generateErrors, generateLatency, generateRequests, generateThroughput, generateTimeouts } = require('./scriptGenerator')
const { writeHtml, writeJs } = require('./writer')

const outputHtml = (title, results, config) => {
  const fullOutputPath = path.join(config.outputPath, `${title}-${Date.now()}`)
  fs.mkdirSync(fullOutputPath, 0o755)

  const indexHtml = buildIndex(title)
  writeHtml(indexHtml, fullOutputPath, 'index')

  outputErrors(title, results, config.errors, fullOutputPath)
  outputLatency(title, results, config.latency, fullOutputPath)
  outputRequests(title, results, config.requests, fullOutputPath)
  outputThroughput(title, results, config.throughput, fullOutputPath)
  outputTimeouts(title, results, config.timeouts, fullOutputPath)
}

module.exports = { outputHtml }

const outputErrors = (title, results, required, fullOutputPath) => {
  if (required) {
    const errorsHtml = buildGraph(`${title} - Errors`, 'errors')
    writeHtml(errorsHtml, fullOutputPath, 'errors')

    const errorsJs = generateErrors(results)
    writeJs(errorsJs, fullOutputPath, 'errors', 'count')
  } else {
    const errors404Html = build404(`${title} - Errors`, 'Errors metrics not requested')
    writeHtml(errors404Html, fullOutputPath, 'errors')
  }
}

const outputLatency = (title, results, required, fullOutputPath) => {
  if (required) {
    const latencyHtml = buildGraph(`${title} - Latency (ms)`, 'latency')
    writeHtml(latencyHtml, fullOutputPath, 'latency')

    const latencyJs = generateLatency(results)
    writeJs(latencyJs.min, fullOutputPath, 'latency', 'min')
    writeJs(latencyJs.mean, fullOutputPath, 'latency', 'mean')
    writeJs(latencyJs.max, fullOutputPath, 'latency', 'max')
    writeJs(latencyJs.percentiles, fullOutputPath, 'latency', 'percentiles')
  } else {
    const latency404Html = build404(`${title} - Latency (ms)`, 'Latency metrics not requested')
    writeHtml(latency404Html, fullOutputPath, 'latency')
  }
}

const outputRequests = (title, results, required, fullOutputPath) => {
  if (required) {
    const requestsHtml = buildGraph(`${title} - Requests / Second`, 'requests')
    writeHtml(requestsHtml, fullOutputPath, 'requests')

    const requestsJs = generateRequests(results)
    writeJs(requestsJs.min, fullOutputPath, 'requests', 'min')
    writeJs(requestsJs.mean, fullOutputPath, 'requests', 'mean')
    writeJs(requestsJs.max, fullOutputPath, 'requests', 'max')
  } else {
    const requests404Html = build404(`${title} - Requests / Second`, 'Requests / Second metrics not requested')
    writeHtml(requests404Html, fullOutputPath, 'errors')
  }
}

const outputThroughput = (title, results, required, fullOutputPath) => {
  if (required) {
    const throughputHtml = buildGraph(`${title} - Throughput (Bytes / Second)`, 'throughput')
    writeHtml(throughputHtml, fullOutputPath, 'throughput')

    const throughputJs = generateThroughput(results)
    writeJs(throughputJs.min, fullOutputPath, 'throughput', 'min')
    writeJs(throughputJs.mean, fullOutputPath, 'throughput', 'mean')
    writeJs(throughputJs.max, fullOutputPath, 'throughput', 'max')
  } else {
    const throughput404Html = build404(`${title} - Throughput (Bytes / Second)`, 'Throughput (Bytes / Second) metrics not requested')
    writeHtml(throughput404Html, fullOutputPath, 'errors')
  }
}

const outputTimeouts = (title, results, required, fullOutputPath) => {
  if (required) {
    const timeoutsHtml = buildGraph(`${title} - Timeouts`, 'timeouts')
    writeHtml(timeoutsHtml, fullOutputPath, 'timeouts')

    const timeoutsJs = generateTimeouts(results)
    writeJs(timeoutsJs, fullOutputPath, 'timeouts', 'count')
  } else {
    const timeouts404Html = build404(`${title} - Timeouts`, 'Timeouts metrics not requested')
    writeHtml(timeouts404Html, fullOutputPath, 'timeouts')
  }
}
