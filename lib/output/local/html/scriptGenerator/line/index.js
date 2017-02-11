'use strict'

const { stringify } = require('../../../../../utils/array/stringify')

const generateLineChart = (selector, chartLabels, chartSeries, opts) => {
  const labels = stringify(chartLabels)
  const series = chartSeries.map(cs => `[ ${stringify(cs)} ]`)

  return `new Chartist.Line('${selector}', { labels: [ ${labels} ], series: [ ${series} ] }, ${opts})`
}

module.exports = { generateLineChart }
