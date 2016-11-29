var constants = require('./constants')
var errorsGraphMaker = require('./errors')
var latencyGraphMaker = require('./latency')
var responseTimeGraphMaker = require('./responseTime')
var throughputGraphMaker = require('./throughput')
var timeoutsGraphMaker = require('./timeouts')

function buildTitles(resultRows) {
  return resultRows.map(resultRow => resultRow[0].title)
}

function graph(resultRows) {
  const titles = buildTitles(resultRows)

  const errors = errorsGraphMaker.buildGraphs(resultRows, titles)
  const latency = latencyGraphMaker.buildGraphs(resultRows, titles)
  const responseTime = responseTimeGraphMaker.buildGraphs(resultRows, titles)
  const throughput = throughputGraphMaker.buildGraphs(resultRows, titles)
  const timeouts = timeoutsGraphMaker.buildGraphs(resultRows, titles)
}

const graphMaker = {
  graph: graph
}

module.exports = graphMaker
