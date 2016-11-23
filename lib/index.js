const async = require('async')
const autocannon = require('autocannon')
const targetingComputer = require('./targetingComputer')
const graphMaker = require('./graphMaker')

function allInARow(timesToFire, targets) {
  return targets.map(target => {
    const row = []
    for(var i = 0; i < timesToFire; i++) row.push(target)
    return row
  })
}

function fire(timesToFire, targets) {
  console.log(`Lining up ${targets.length} target${targets.length > 1 ? 's' : ''}`)
  const rows = allInARow(timesToFire, targets)

  console.log('Firing now')
  async.mapSeries(rows, (row, seriesCB) => {
    async.mapLimit(row, 2, autocannon, (rowErr, rowResults) => {
      seriesCB(rowErr, rowResults)
    })
  }, (rowsErr, rowsResults) => {
    console.log('Firing sequence complete')

    if(rowsErr) console.error(rowsErr)
    else graphMaker.graph(rowsResults)
  })
}

const winchester = {
  aim: targetingComputer.alignSights,
  fire: fire
}

module.exports = winchester
