const fs = require('fs')
const pageConstants = require('./pageConstants')

function graph(resultRows) {
  console.log('Building graphs')

  const means = resultRows.map(resultRow => resultRow.map(result => result.requests.mean))
  const titles = resultRows.map(resultRow => resultRow[0].title)

  const meansData = [ [ 'Run' ].concat(titles) ]

  for(var c = 0; c < means[0].length; c++) {
    var run = [ `${c + 1}` ]
    for(var r = 0; r < means.length; r++) {
      run = run.concat([ means[r][c] ])
    }
    meansData.push(run)
  }

  const options = pageConstants.chartOptions('Average Requests/Second')

  const page = `
  ${pageConstants.pagePrefix}
  ${pageConstants.drawChart(meansData, options)}
  ${pageConstants.pageSuffix}
  `
  console.log('Built graphs')

  console.log('Writing graphs...')
  fs.writeFileSync('./output.html', page)
  console.log('Written graphs to output.html')
}

const graphMaker = {
  graph: graph
}

module.exports = graphMaker
