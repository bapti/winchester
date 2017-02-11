'use strict'

const { generateAxisTitles } = require('../axisTitles')
const { generatePointLabels } = require('../pointLabels')
const { generateOpts } = require('../opts')
const { generateLineChart } = require('../line')

const generateThroughputScript = (res) => {
  const labels = new Array(res[0].length).fill(0).map((c, i) => i)

  const means = res.map(row => row.map(r => r.throughput.mean))
  const mins = res.map(row => row.map(r => r.throughput.min))
  const maxs = res.map(row => row.map(r => r.throughput.max))

  const yAxis = { offset: { x: 0, y: -50 }, flipTitle: false }
  const meanYAxis = Object.assign({}, yAxis, { title: 'Mean Throughput (Bytes / Second)' })
  const minYAxis = Object.assign({}, yAxis, { title: 'Min Throughput (Bytes / Second)' })
  const maxYAxis = Object.assign({}, yAxis, { title: 'Max Throughput (Bytes / Second)' })

  const pointLabels = generatePointLabels()

  const meanOpts = generateOpts([ generateAxisTitles(meanYAxis), pointLabels ])
  const minOpts = generateOpts([ generateAxisTitles(minYAxis), pointLabels ])
  const maxOpts = generateOpts([ generateAxisTitles(maxYAxis), pointLabels ])

  return {
    mean: generateLineChart('#mean', labels, means, meanOpts),
    min: generateLineChart('#min', labels, mins, minOpts),
    max: generateLineChart('#max', labels, maxs, maxOpts)
  }
}

'use strict'

module.exports = { generateThroughputScript }
