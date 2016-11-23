const async = require('async')
const autocannon = require('autocannon')
const targetingComputer = require('./targetingComputer')
const graphMaker = require('./graphMaker')

function leverAction(target) {
  const { url, connections, pipelining, duration, method, headers, body,
    body_file, title } = target

  return {
    url: url,
    connections: connections,
    pipelining: pipelining,
    duration: duration,
    method: method,
    headers: headers,
    body: body,
    body_file: body_file,
    title: title
  }
}

function allInARow(targets) {
  return targets.map(target => {
    const { repeat } = target
    const config = leverAction(target)

    const row = []
    for(var i = 0; i < repeat; i++) row.push(config)
    return row
  })
}

function fire(targets) {
  const rows = allInARow(targets)
  async.mapSeries(rows, (row, seriesCB) => {
    async.mapLimit(row, 2, autocannon, (rowErr, rowResults) => {
      seriesCB(rowErr, rowResults)
    })
  }, (rowsErr, rowsResults) => {
    if(rowsErr) console.error(rowsErr)
    else graphMaker.graph(rowsResults)
  })
}

const winchester = {
  aim: targetingComputer.alignSights,
  fire: fire
}

module.exports = winchester
