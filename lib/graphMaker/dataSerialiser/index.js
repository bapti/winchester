function printPoints(points) {
  const pointString = points.reduce((a, p) => `${a}, ${p}`)
  return `[ ${pointString} ]`
}

function stringify(graphData) {
  const basic = `{ x: ${printPoints(graphData.x)}, y: ${printPoints(graphData.y)}, type: '${graphData.type}'`
  const withMode = graphData.mode ? `${basic}, mode: '${graphData.mode}'` : basic
  const withName = graphData.name ? `${withMode}, name: '${graphData.name}'` : withMode
  return `${withName} }`
}

const dataSerialiser = {
  stringify: stringify
}

module.exports = dataSerialiser
