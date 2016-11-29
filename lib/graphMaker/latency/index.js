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

function buildMeanData(resultRows, titles) {
  const means = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.mean)
  })

  return buildData(means, titles)
}

function buildMeanOptions () {
  return optionsMaker.buildLineChartOptions({
    title: 'Mean Latency',
    subtitle: '(ms)',
    curved: true
  })
}

function buildMinData(resultRows, titles) {
  const mins = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.min)
  })

  return buildData(mins, titles)
}

function buildMinOptions() {
  return optionsMaker.buildLineChartOptions({
    title: 'Mininum Latency',
    subtitle: '(ms)',
    curved: true
  })
}

function buildMaxData(resultRows, titles) {
  const maxs = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.max)
  })

  return buildData(maxs, titles)
}

function buildMaxOptions() {
  return optionsMaker.buildLineChartOptions({
    title: 'Maximum Latency',
    subtitle: '(ms)',
    curved: true
  })
}

function buildP50Data(resultRows, titles) {
  const p50s = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.p50)
  })

  return buildData(p50s, titles)
}

function buildP50Options() {
  return optionsMaker.buildLineChartOptions({
    title: 'Latency - 50th Percentile',
    subtitle: '(ms)',
    curved: true
  })
}

function buildP75Data(resultRows, titles) {
  const p75s = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.p75)
  })

  return buildData(p75s, titles)
}

function buildP75Options() {
  return optionsMaker.buildLineChartOptions({
    title: 'Latency - 75th Percentile',
    subtitle: '(ms)',
    curved: true
  })
}

function buildP90Data(resultRows, titles) {
  const p90s = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.p90)
  })

  return buildData(p90s, titles)
}

function buildP90Options() {
  return optionsMaker.buildLineChartOptions({
    title: 'Latency - 90th Percentile',
    subtitle: '(ms)',
    curved: true
  })
}

function buildP99Data(resultRows, titles) {
  const p99s = resultRows.map(resultRow => {
    return resultRow.map(result => result.latency.p99)
  })

  return buildData(p99s, titles)
}

function buildP99Options() {
  return optionsMaker.buildLineChartOptions({
    title: 'Latency - 99th Percentile',
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
    maxOpts: buildMaxOptions(),
    p50Data: buildP50Data(resultRows, titles),
    p50Opts: buildP50Options(),
    p75Data: buildP75Data(resultRows, titles),
    p75Opts: buildP75Options(),
    p90Data: buildP90Data(resultRows, titles),
    p90Opts: buildP90Options(),
    p99Data: buildP99Data(resultRows, titles),
    p99Opts: buildP99Options()
  }
}

const latencyGraphMaker = {
  buildGraphs: buildGraphs
}

module.exports = latencyGraphMaker
