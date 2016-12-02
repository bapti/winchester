'use strict'

const optionsMaker = require('../graphOptionsBuilder')

function buildData(metrics, keys) {
  const data = [ [ 'Run' ].concat(keys) ]
  const height = metrics.length
  const width = metrics[0].length

  for(var column = 0; column < width; column++) {
    var dataRow = [ `${column + 1}`]
    for(var row = 0; row < height; row++) {
      dataRow = dataRow.concat([ metrics[row][column] ])
    }
    data.push(dataRow)
  }

  return data
}

function buildCountData(resultRows, titles) {
  const counts = resultRows.map(resultRow => {
    return resultRow.map(result => result.errors)
  })

  return buildData(counts, titles)
}

function buildCountOptions() {
  return optionsMaker.buildLineChartOptions({
    title: 'API Errors',
    curved: true
  })
}

function buildGraphs(resultRows, titles) {
  return {
    countData: buildCountData(resultRows, titles),
    countOpts: buildCountOptions()
  }
}

const errorsGraphMaker = {
  buildGraphs: buildGraphs
}

module.exports = errorsGraphMaker
