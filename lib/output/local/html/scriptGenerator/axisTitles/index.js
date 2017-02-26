'use strict'

const generateAxisTitle = (params) => {
  const title = params.title
  const x = params.offset.x
  const y = params.offset.y
  const flipTitle = params.flipTitle

  return `{ axisTitle: '${title}', axisClass: 'ct-axis-title', offset: { x: ${x}, y: ${y} }, textAnchor: 'middle', flipTitle: ${flipTitle}}`
}

const generateAxisTitles = (yAxis) => {
  const axisX = `{ axisTitle: 'Iteration', axisClass: 'ct-axis-title', offset: { x: 0, y: 50 }, textAnchor: 'middle'}`
  const axisY = generateAxisTitle(yAxis)

  return `Chartist.plugins.ctAxisTitle({ axisX: ${axisX}, axisY: ${axisY} })`
}

module.exports = generateAxisTitles
