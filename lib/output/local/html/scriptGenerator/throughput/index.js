'use strict'

const { generateAxisTitles } = require('../axisTitles')
const { generatePointLabels } = require('../pointLabels')
const { generateLegend } = require('../legend')
const { generateLineOpts } = require('../opts')
const { generateLineChart } = require('../line')

const generateThroughput = (res) => {
  const names = res.map(row => `'${row[0].title}'`)
  const labels = new Array(res[0].length).fill(0).map((c, i) => i)

  const means = res.map(row => row.map(r => r.throughput.mean))
  const mins = res.map(row => row.map(r => r.throughput.min))
  const maxs = res.map(row => row.map(r => r.throughput.max))

  const yAxis = { offset: { x: 0, y: -50 }, flipTitle: false }
  const meanYAxis = Object.assign({}, yAxis, { title: 'Mean Throughput (Bytes / Second)' })
  const minYAxis = Object.assign({}, yAxis, { title: 'Min Throughput (Bytes / Second)' })
  const maxYAxis = Object.assign({}, yAxis, { title: 'Max Throughput (Bytes / Second)' })

  const pointLabels = generatePointLabels()
  const legend = generateLegend(names)

  const meanOpts = generateLineOpts([ generateAxisTitles(meanYAxis), pointLabels, legend ])
  const minOpts = generateLineOpts([ generateAxisTitles(minYAxis), pointLabels, legend ])
  const maxOpts = generateLineOpts([ generateAxisTitles(maxYAxis), pointLabels, legend ])

  return {
    mean: generateLineChart('#mean', labels, means, meanOpts),
    min: generateLineChart('#min', labels, mins, minOpts),
    max: generateLineChart('#max', labels, maxs, maxOpts)
  }
}

'use strict'

module.exports = { generateThroughput }
