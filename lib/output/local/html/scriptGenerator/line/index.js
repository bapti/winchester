'use strict'

const { stringifyReducer } = require('../../../../utils/array/stringify')

const generateLineChart = (selector, chartLabels, chartSeries, opts) => {
  const labels = chartLabels.reduce(stringifyReducer)
  const series = chartSeries.reduce(stringifyReducer)

  return `new Chartist.Line('${selector}', { labels: ${labels}, series: ${series} }, ${opts})`
}
