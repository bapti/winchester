'use strict'

const { generateAxisTitles } = require('../axisTitles')
const { generatePointLabels } = require('../pointLabels')
const { generateOpts } = require('../opts')
const { generateLineChart } = require('../line')

const generateErrorsScript = (res) => {
  const labels = new Array(res[0].length).fill(0).map(c, i => i)
  const series = res.map(row => row.map(r => r.errors))

  const axisX = { title: 'AutoCannon Iteration', offset: { x: 0, y: 50 }, flipTitle: false }
  const axisY = { title: 'Errors', offset: { x: 0, y: -50 }, flipTitle: false }

  const axisTitles = generateAxisTitles(axisX, axisY)
  const pointLabels = generatePointLabels()

  const opts = generateOpts([ axisTitles, pointLabels ])

  return generateLineChart('#count', labels, series, opts)
}


module.exports = { generateErrorsScript }
