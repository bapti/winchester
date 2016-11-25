function buildLineChartOptions({title, subtitle, curved}) {
  var opts = `{title:'${title}',`
  opts = subtitle ? `${opts}subtitle:${subtitle},` : opts
  opts = `${opts}curveType:${curved ? `'function'` : `'none'`},`

  return `${opts}legend:{position:'bottom'}}`
}

function buildBarChartOptions(title) {

}

const graphOptionsBuilder = {
  buildLineChartOptions: buildLineChartOptions,
  buildBarChartOptions: buildBarChartOptions
}

module.exports = graphOptionsBuilder
