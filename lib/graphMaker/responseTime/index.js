const optionsMaker = require('../graphOptionsBuilder')

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
    return resultRow.map(result => result.requests.mean)
  })

  return buildData(means, titles)
}

function buildMeanOptions () {
  return optionsMaker.buildLineChartOptions({
    title: 'Mean Response Time',
    subtitle: '(ms)',
    curved: true
  })
}

function buildMinData(resultRows, titles) {
  const mins = resultRows.map(resultRow => {
    return resultRow.map(result => result.requests.min)
  })

  return buildData(mins, titles)
}

function buildMinOptions() {
  return optionsMaker.buildLineChartOptions({
    title: 'Mininum Response Time',
    subtitle: '(ms)',
    curved: true
  })
}

function buildMaxData(resultRows, titles) {
  const maxs = resultRows.map(resultRow => {
    return resultRow.map(result => result.requests.max)
  })

  return buildData(maxs, titles)
}

function buildMaxOptions() {
  return optionsMaker.buildLineChartOptions({
    title: 'Maximum Response Time',
    subtitle: '(ms)',
    curved: true
  })
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

const responseTimeGraphMaker = {
  buildGraphs: buildGraphs
}

module.exports = responseTimeGraphMaker
