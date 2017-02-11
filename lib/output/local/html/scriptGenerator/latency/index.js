'use strict'

const { generateAxisTitles } = require('../axisTitles')
const { generatePointLabels } = require('../pointLabels')
const { generateLineOpts, generateStackedBarOpts } = require('../opts')
const { generateLineChart } = require('../line')
const { generateStackedBarChart } = require('../bar')

const generateLatency = (res) => {
  const labels = res.map(row => row[0].title)

  const means = res.map(row => row.map(r => r.latency.mean))
  const mins = res.map(row => row.map(r => r.latency.min))
  const maxs = res.map(row => row.map(r => r.latency.max))
  const percs = res.map(row => row.reduce(reducePercentiles, [ 0, 0, 0, 0 ]))

  const yAxis = { offset: { x: 0, y: -50 }, flipTitle: false }
  const meanYAxis = Object.assign({}, yAxis, { title: 'Mean Latency (ms)' })
  const minYAxis = Object.assign({}, yAxis, { title: 'Min Latency (ms)' })
  const maxYAxis = Object.assign({}, yAxis, { title: 'Max Latency (ms)' })
  const percsYAxis = Object.assign({}, yAxis, { title: '50th, 75th, 90th & 99th Latency Percentiles (ms)' })

  const pointLabels = generatePointLabels()

  const meanOpts = generateLineOpts([ generateAxisTitles(meanYAxis), pointLabels ])
  const minOpts = generateLineOpts([ generateAxisTitles(minYAxis), pointLabels ])
  const maxOpts = generateLineOpts([ generateAxisTitles(maxYAxis), pointLabels ])
  const percsOpts = generateStackedBarOpts([ generateAxisTitles(percsYAxis), pointLabels ])

  return {
    mean: generateLineChart('#mean', labels, means, meanOpts),
    min: generateLineChart('#min', labels, mins, minOpts),
    max: generateLineChart('#max', labels, maxs, maxOpts),
    percentiles: generateStackedBarChart('#percentiles', labels, percs, percsOpts)
  }
}

module.exports = { generateLatency }

const reducePercentiles = (acc, res, index) => {
  acc[0] = (acc[0] + res.latency.p50) / (index + 1)
  acc[1] = (acc[1] + res.latency.p75) / (index + 1)
  acc[2] = (acc[2] + res.latency.p90) / (index + 1)
  acc[3] = (acc[3] + res.latency.p99) / (index + 1)
  return acc
}
