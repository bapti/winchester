const fs = require('fs')
const path = require('path')

const head = '<head><script src="./plotly.min.js"></script><title>Plotly Output</title></head>'
const bodyStart = '<body>'
const div = '<div id="myDiv" style="width: 480px; height: 400px;"></div>'
const scriptStart = '<script charset="utf8" id="plotlyCodeGoesHere" type="text/javascript">'
const scriptClose = '</script>'
const bodyClose = '</body>'

function makeGraph(results) {
  const resultObject = {
    x: results.map((r, i) => i),
    y: results.map(result => result.requests.mean),
    type: 'scatter'
  }

  const file = `
    ${head}
    ${bodyStart}
    ${div}
    ${scriptStart}
    var data = ${resultObject}
    Plotly.newPlot('myDiv', data)
    ${scriptClose}
    ${bodyClose}`

  console.log(file)

  // fs.writeFileSync(path.join(__dirname, './output'), file)
}

const graphMaker = {
  makeGraph: makeGraph
}

module.exports = graphMaker
