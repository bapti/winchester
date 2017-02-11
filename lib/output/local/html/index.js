'use strict'

const fs = require('fs')
const path = require('path')

const { buildIndex, buildGraph } = require('./pageBuilder')
const { generateErrors, generateLatency, generateRequests, generateThroughput, generateTimeouts } = require('./scriptGenerator')
const { writeHtml, writeJs } = require('./writer')

const outputHtml = (title, results, outputPath) => {
  const fullOutputPath = path.join(outputPath, `${title}-${Date.now()}`)
  fs.mkdirSync(fullOutputPath, 755)

  const indexHtml = buildIndex(title)
  writeHtml(indexHtml, fullOutputPath, 'index')

  const errorsHtml = buildGraph(`${title} - Errors`, 'errors')
  writeHtml(errorsHtml, fullOutputPath, 'errors')

  const errorsJs = generateErrors(results)
  writeJs(errorJs, fullOutputPath, 'errors', 'count')

  const latencyHtml = buildGraph(`${title} - Latency (ms)`, 'latency')
  writeHtml(latencyHtml, fullOutputPath, 'latency')

  const latencyJs = generateErrors(results)
  writeJs(latencyJs.min, fullOutputPath, 'latency', 'min')
  writeJs(latencyJs.mean, fullOutputPath, 'latency', 'mean')
  writeJs(latencyJs.max, fullOutputPath, 'latency', 'max')
  writeJs(latencyJs.percentiles, fullOutputPath, 'latency', 'percentiles')

  const requestsHtml = buildGraph(`${title} - Requests / Second`, 'requests')
  writeHtml(requestsHtml, fullOutputPath, 'requests')

  const requestsJs = generateErrors(results)
  writeJs(requestsJs.min, fullOutputPath, 'requests', 'min')
  writeJs(requestsJs.mean, fullOutputPath, 'requests', 'mean')
  writeJs(requestsJs.max, fullOutputPath, 'requests', 'max')

  const throughputHtml = buildGraph(`${title} - Throughput (Bytes / Second)`, 'throughput')
  writeHtml(throughputHtml, fullOutputPath, 'throughput')

  const throughputJs = generateErrors(results)
  writeJs(throughputJs.min, fullOutputPath, 'throughput', 'min')
  writeJs(throughputJs.mean, fullOutputPath, 'throughput', 'mean')
  writeJs(throughputJs.max, fullOutputPath, 'throughput', 'max')

  const timeoutsHtml = buildGraph(`${title} - Timeouts`, 'timeouts')
  writeHtml(timeoutsHtml, fullOutputPath, 'timeouts')

  const timeoutsJs = generateErrors(results)
  writeJs(timeoutsJs, fullOutputPath, 'timeouts', 'count')
}

module.exports = { outputHtml }
