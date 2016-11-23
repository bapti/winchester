const fs = require('fs')
const pageConstants = require('./pageConstants')

function buildMeansData(means, titles) {
  const meansData = [ [ 'Run' ].concat(titles) ]

  for(var c = 0; c < means[0].length; c++) {
    var run = [ `${c + 1}` ]
    for(var r = 0; r < means.length; r++) {
      run = run.concat([ means[r][c] ])
    }
    meansData.push(run)
  }

  return meansData
}

function graph(resultRows) {
  console.log('Building graphs')

  const means = resultRows.map(resultRow => resultRow.map(result => result.requests.mean))
  const titles = resultRows.map(resultRow => resultRow[0].title)
  const meansData = buildMeansData(means, titles)

  const options = pageConstants.chartOptions('Average Requests/Second')

  const page = `
  ${pageConstants.pagePrefix}
  ${pageConstants.drawChart(meansData, options)}
  ${pageConstants.pageSuffix}
  `
  console.log('Built graphs')

  const fileName = `output-${Date.now()}.html`

  console.log('Writing graphs...')
  fs.writeFile(`./${fileName}`, page, (err) => {
    if(err) console.error(err)
    else console.log(`Written graphs to ${fileName}`)
    process.exit()
  })
}

const graphMaker = {
  graph: graph
}

module.exports = graphMaker
