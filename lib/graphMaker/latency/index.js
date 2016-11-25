const pageConstants = require('./pageConstants')

function buildData(metrics, keys) {
  const data = [ [ 'Run' ].concat(keys) ]
  const height = metrics.length
  const width = metrics[0].length

  for(var column = 0; column < width; column++) {
    var dataRow = [ `${column + 1}`]
    for(var row = 0; row < height; row++) {
      dataRow = dataRow.concat([ metric[row][column] ])
    }
    data.push(dataRow)
  }

  return data
}

function buildMeanData(resultRows, titles) {
  const means = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.mean)
  })

  return buildData(means, titles)
}

function buildMeanOptions () {

}

function buildMinData(resultRows, titles) {
  const mins = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.min)
  })

  return buildData(mins, titles)
}

function buildMinOptions() {

}

function buildMaxData(resultRows, titles) {
  const maxs = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.max)
  })

  return buildData(maxs, titles)
}

function buildMaxOptions() {

}

function buildP50Data(resultRows, titles) {
  const p50s = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.p50)
  })

  return buildData(p50s, titles)
}

function buildP50Options() {

}

function buildP75Data(resultRows, titles) {
  const p75s = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.p75)
  })

  return buildData(p75s, titles)
}

function buildP75Options() {

}

function buildP90Data(resultRows, titles) {
  const p90s = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.p90)
  })

  return buildData(p90s, titles)
}

function buildP90Options() {

}

function buildP99Data(resultRows, titles) {
  const p99s = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.p99)
  })

  return buildData(p99s, titles)
}

function buildP99Options() {

}

function buildGraphs(resultRows, titles) {
  return {
    meanData: buildMeanData(resultRows, titles),
    meanOpts: buildMeanOptions(),
    minData: buildMinData(resultRows, titles),
    minOpts: buildMinOptions(),
    maxData: buildMaxData(resultRows, titles),
    maxOpts: buildMaxOptions(),
    maxData: buildP50Data(resultRows, titles),
    maxOpts: buildP50Options(),
    maxData: buildP75Data(resultRows, titles),
    maxOpts: buildP75Options(),
    maxData: buildP90Data(resultRows, titles),
    maxOpts: buildP90Options(),
    maxData: buildP99Data(resultRows, titles),
    maxOpts: buildP99Options()
  }
}

const latencyGraphMaker = {
  buildGraphs: buildGraphs
}

module.exports = latencyGraphMaker
