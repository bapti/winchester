'use strict'

const generateAxisTitles = require('../axisTitles')
const generatePointLabels = require('../pointLabels')
const generateLegend = require('../legend')
const generateLineOpts = require('../opts').generateLineOpts
const generateLineChart = require('../line')

const generateRequests = (res) => {
  const names = res.map(row => `'${row[0].title}'`)
  const labels = new Array(res[0].length).fill(0).map((c, i) => i)

  const means = res.map(row => row.map(r => r.requests.mean))
  const mins = res.map(row => row.map(r => r.requests.min))
  const maxs = res.map(row => row.map(r => r.requests.max))

  const yAxis = { offset: { x: 0, y: -50 }, flipTitle: false }
  const meanYAxis = Object.assign({}, yAxis, { title: 'Mean Requests / Second' })
  const minYAxis = Object.assign({}, yAxis, { title: 'Min Requests / Second' })
  const maxYAxis = Object.assign({}, yAxis, { title: 'Max Requests / Second' })

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

module.exports = generateRequests
