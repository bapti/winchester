'use strict'

function basicOptionsBuilder({title, subtitle}) {
  var opts = `{title:'${title}',`
  return subtitle ? `${opts}subtitle:'${subtitle}',` : opts
}

function buildLineChartOptions({title, subtitle, curved}) {
  var opts = basicOptionsBuilder({title: title, subtitle: subtitle})
  opts = `${opts}curveType:${curved ? `'function'` : `'none'`},`

  return `${opts}legend:{position:'bottom'}}`
}

function buildBarChartOptions({title, subtitle, stacked, }) {
  var opts = basicOptionsBuilder({title: title, subtitle: subtitle})
  opts = `${opts}isStacked:${stacked ? `true` : `false`},`

  return `${opts}legend:{position:'bottom'}}`
}

const graphOptionsBuilder = {
  buildLineChartOptions: buildLineChartOptions,
  buildBarChartOptions: buildBarChartOptions
}

module.exports = graphOptionsBuilder
