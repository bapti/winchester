const fs = require('fs-extra')
const path = require('path')
const dataSerialiser = require('./dataSerialiser')

const head = '<head><script src="./plotly.min.js"></script><title>Plotly Output</title></head>'
const bodyStart = '<body>'
const div = '<div id="myDiv"></div>'
const scriptStart = '<script charset="utf8" id="plotlyCodeGoesHere" type="text/javascript">'
const scriptClose = '</script>'
const bodyClose = '</body>'

function makeGraph(resultArrays) {
  const resultObjects = []
  for(var i = 0; i < resultArrays.length; i++) {
    const results = resultArrays[i]

    resultObjects.push({
      x: results.map((r, i) => i),
      y: results.map(result => result.requests.mean),
      type: 'scatter',
      mode: 'lines+markers',
      name: results[0].title
    })
  }

  var data = resultObjects.reduce((a, ro) => `${a}${dataSerialiser.stringify(ro)}, `, '')

  const file = `
    ${head}
    ${bodyStart}
    ${div}
    ${scriptStart}
    var data = [ ${data} ]
    Plotly.newPlot('myDiv', data, { title: 'Average Requests / Second' })
    ${scriptClose}
    ${bodyClose}`

  fs.removeSync(path.join(__dirname, './output/test.html'))
  fs.removeSync(path.join(__dirname, './output/plotly.min.js'))
  fs.writeFileSync(path.join(__dirname, './output/test.html'), file)
  fs.copySync(path.join(__dirname, './assets/plotly.min.js'), path.join(__dirname, './output/plotly.min.js'))
}

const graphMaker = {
  makeGraph: makeGraph
}

module.exports = graphMaker
