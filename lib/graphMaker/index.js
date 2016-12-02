'use strict'

const fs = require('fs')
const path = require('path')

const constants = require('./constants')
const errorsGraphMaker = require('./errors')
const functionBuilder = require('./graphFunctionBuilder')
const latencyGraphMaker = require('./latency')
const pageMaker = require('./pageMaker')
const responseTimeGraphMaker = require('./responseTime')
const throughputGraphMaker = require('./throughput')
const timeoutsGraphMaker = require('./timeouts')

function buildTitles(resultRows) {
  return resultRows.map(resultRow => resultRow[0].title)
}

function buildGraphs(resultRows, titles) {
  return {
    errors: errorsGraphMaker.buildGraphs(resultRows, titles),
    latency: latencyGraphMaker.buildGraphs(resultRows, titles),
    responseTime: responseTimeGraphMaker.buildGraphs(resultRows, titles),
    throughput: throughputGraphMaker.buildGraphs(resultRows, titles),
    timeouts: timeoutsGraphMaker.buildGraphs(resultRows, titles)
  }
}

function makeOutputPaths(projectRoot) {
  const ts = Date.now()
  const outputPath = path.resolve(projectRoot, `output-${ts}`)

  return {
    outputPath: outputPath,
    errorsPath: path.resolve(outputPath, 'errors'),
    latencyPath: path.resolve(outputPath, 'latency'),
    responseTimePath: path.resolve(outputPath, 'responseTime'),
    throughputPath: path.resolve(outputPath, 'throughput'),
    timeoutsPath: path.resolve(outputPath, 'timeouts')
  }
}

function makeOutputDirs(outputPaths) {
  const { outputPath, errorsPath, latencyPath, responseTimePath,
    throughputPath, timeoutsPath } = outputPaths

  console.log(`Making output directory => ${outputPath}`)
  fs.mkdirSync(outputPath)
  fs.mkdirSync(errorsPath)
  fs.mkdirSync(latencyPath)
  fs.mkdirSync(responseTimePath)
  fs.mkdirSync(throughputPath)
  fs.mkdirSync(timeoutsPath)
  console.log(`Ouput directory created`)
}

function outputIndexPage(outputPath) {
  const indexPath = path.resolve(outputPath, 'index.html')
  fs.writeFileSync(indexPath, constants.indexPage)
}

function outputData(data, opts, dataTitle, dataType, outputPath) {
  const dataFn = functionBuilder.drawLineChart(data, opts)
  const dataPg = pageMaker.makePage(dataTitle, dataFn)
  const dataPath = path.resolve(outputPath, `${dataType}.html`)
  fs.writeFileSync(dataPath, dataPg)
}

function outputErrors({countData, countOpts}, errorsPath) {
  outputData(countData, countOpts, 'Errors Returned', 'count', errorsPath)
}

function outputLatency(latency, latencyPath) {
  const { meanData, meanOpts, minData, minOpts, maxData, maxOpts, p50Data,
    p50Opts, p75Data, p75Opts, p90Data, p90Opts, p99Data, p99Opts } = latency

  outputData(meanData, meanOpts, 'Mean Latency', 'mean', latencyPath)
  outputData(maxData, maxOpts, 'Maximum Latency', 'max', latencyPath)
  outputData(minData, minOpts, 'Minimum Latency', 'min', latencyPath)
  outputData(p50Data, p50Opts, 'Latency 50th Percentile', 'p50', latencyPath)
  outputData(p75Data, p75Opts, 'Latency 75th Percentile', 'p75', latencyPath)
  outputData(p90Data, p90Opts, 'Latency 90th Percentile', 'p90', latencyPath)
  outputData(p99Data, p99Opts, 'Latency 99th Percentile', 'p99', latencyPath)
}

function outputResponseTime(responseTime, responseTimePath) {
  const { meanData, meanOpts, minData, minOpts, maxData, maxOpts } = responseTime

  outputData(meanData, meanOpts, 'Mean Response Time', 'mean', responseTimePath)
  outputData(maxData, maxOpts, 'Maximum Response Time', 'max', responseTimePath)
  outputData(minData, minOpts, 'Minimum Response Time', 'min', responseTimePath)
}

function outputThroughput(throughput, throughputPath) {
  const { meanData, meanOpts, minData, minOpts, maxData, maxOpts } = throughput

  outputData(meanData, meanOpts, 'Mean Throughput', 'mean', throughputPath)
  outputData(maxData, maxOpts, 'Maximum Throughput', 'max', throughputPath)
  outputData(minData, minOpts, 'Minimum Throughput', 'min', throughputPath)
}

function outputTimeouts({countData, countOpts}, timeoutsPath) {
  outputData(countData, countOpts, 'Timeouts Occurred', 'count', timeoutsPath)
}

function graph(resultRows, projectRoot) {
  const titles = buildTitles(resultRows)
  console.log('Building graphs')
  const graphs = buildGraphs(resultRows, titles)
  console.log('Finished building graphs')

  const outputPaths = makeOutputPaths(projectRoot)
  makeOutputDirs(outputPaths)

  outputIndexPage(outputPaths.outputPath)
  outputErrors(graphs.errors, outputPaths.errorsPath)
  outputLatency(graphs.latency, outputPaths.latencyPath)
  outputResponseTime(graphs.responseTime, outputPaths.responseTimePath)
  outputThroughput(graphs.throughput, outputPaths.throughputPath)
  outputTimeouts(graphs.timeouts, outputPaths.timeoutsPath)
}

const graphMaker = {
  graph: graph
}

module.exports = graphMaker
