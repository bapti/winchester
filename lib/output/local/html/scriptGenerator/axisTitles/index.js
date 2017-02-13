'use strict'

const generateAxisTitle = ({ title, offset, flipTitle }) => {
  const { x, y } = offset

  return `{ axisTitle: '${title}', axisClass: 'ct-axis-title', offset: { x: ${x}, y: ${y} }, textAnchor: 'middle', flipTitle: ${flipTitle}}`
}

const generateAxisTitles = (yAxis) => {
  const axisX = `{ axisTitle: 'Iteration', axisClass: 'ct-axis-title', offset: { x: 0, y: 50 }, textAnchor: 'middle'}`
  const axisY = generateAxisTitle(yAxis)

  return `Chartist.plugins.ctAxisTitle({ axisX: ${axisX}, axisY: ${axisY} })`
}

module.exports = { generateAxisTitles }
