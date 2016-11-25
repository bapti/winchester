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
    return resultRow.map(result => result.throughput.mean)
  })

  return buildData(means, titles)
}

function buildMeanOptions () {

}

function buildMinData(resultRows, titles) {
  const mins = resultRows.map(resultRow => {
    return resultRow.map(result => result.throughput.min)
  })

  return buildData(mins, titles)
}

function buildMinOptions() {

}

function buildMaxData(resultRows, titles) {
  const maxs = resultRows.map(resultRow => {
    return resultRow.map(result => result.throughput.max)
  })

  return buildData(maxs, titles)
}

function buildMaxOptions() {

}

function buildGraphs(resultRows, titles) {
  return {
    meanData: buildMeanData(resultRows, titles),
    meanOpts: buildMeanOptions(),
    minData: buildMinData(resultRows, titles),
    minOpts: buildMinOptions(),
    maxData: buildMaxData(resultRows, titles),
    maxOpts: buildMaxOptions()
  }
}

const throughputGraphMaker = {
  buildGraphs: buildGraphs
}

module.exports = throughputGraphMaker
