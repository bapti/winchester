const fs = require('fs')
const pageConstants = require('./pageConstants')

function graph(resultRows) {
  const means = resultRows.map(resultRow => resultRow.map(result => result.requests.mean))
  const titles = resultRows.map(resultRow => resultRow[0].title)

  const data = [
    [ 'Run' ].concat(titles),
    [ 0 ].concat(means.map(m => m[0])),
    [ 1 ].concat(means.map(m => m[1])),
    [ 2 ].concat(means.map(m => m[2]))
  ]

  const options = pageConstants.chartOptions('Average Requests/Second')

  const page = `
  ${pageConstants.pagePrefix}
  ${pageConstants.drawChart(data, options)}
  ${pageConstants.pageSuffix}
  `

  fs.writeFileSync('./output.html', page)
}

const graphMaker = {
  graph: graph
}

module.exports = graphMaker
