const fs = require('fs')
const pageConstants = require('./pageConstants')

function graph(resultRows) {
  const means = resultRows.map(resultRow => resultRow.map(result => result.requests.mean))
  const titles = resultRows.map(resultRow => resultRow[0].title)

  const meansData = [ [ 'Run' ].concat(titles) ]
  means.forEach((m, i) => { meansData.push([ i ].concat(means.map(m => m[i]))) })

  const options = pageConstants.chartOptions('Average Requests/Second')

  const page = `
  ${pageConstants.pagePrefix}
  ${pageConstants.drawChart(meansData, options)}
  ${pageConstants.pageSuffix}
  `

  fs.writeFileSync('./output.html', page)
}

const graphMaker = {
  graph: graph
}

module.exports = graphMaker
