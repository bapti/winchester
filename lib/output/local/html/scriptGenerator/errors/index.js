'use strict'

const { generateAxisTitles } = require('../axisTitles')
const { generatePointLabels } = require('../pointLabels')
const { generateLegend } = require('../legend')
const { generateLineOpts } = require('../opts')
const { generateLineChart } = require('../line')

const generateErrors = (res) => {
  const names = res.map(row => `'${row[0].title}'`)
  const labels = new Array(res[0].length).fill(0).map((c, i) => i)
  const series = res.map(row => row.map(r => r.errors))

  const axisY = { title: 'Errors', offset: { x: 0, y: -50 }, flipTitle: false }

  const axisTitles = generateAxisTitles(axisY)
  const pointLabels = generatePointLabels()
  const legend = generateLegend(names)

  const opts = generateLineOpts([ axisTitles, pointLabels, legend ])

  return generateLineChart('#count', labels, series, opts)
}

module.exports = { generateErrors }
