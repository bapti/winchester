'use strict'

const _ = require('lodash')
const { stringify } = require('../../../../../utils/array/stringify')

const generateStackedBarChart = (selector, chartLabels, chartSeries, opts) => {
  const labels = stringify(chartLabels)
  const series = _.zip(...chartSeries).map(cs => `[ ${stringify(cs)} ]`)

  const graph = `new Chartist.Bar('${selector}', { labels: [ ${labels} ], series: [ ${series} ] }, ${opts})`
  const onDraw = `on('draw', function (data) { if (data.type === 'bar') { data.element.attr({ style: 'stroke-width: 30px' }) } })`

  return `${graph}.${onDraw}`
}

module.exports = { generateStackedBarChart }
