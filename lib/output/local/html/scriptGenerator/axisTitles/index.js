'use strict'

const generateAxisTitle({ title, offset, flipTitle }) => {
  const { x, y } = offset

  return `{ axisTitle: '${title}', axisClass: 'ct-axis-title', offset: { x: ${x}, y: ${y} }, textAnchor: 'middle', flipTitle: ${flipTitle}}`
}

const generateAxisTitles = (axisX, axisY) => {
  const axisX = generateAxisTitle(axisX)
  const axisY = generateAxisTitle(axisY)

  return `Chartist.plugins.ctAxisTitle({ axisX: ${axisX}, axisY: ${axisY} })`
}

module.exports = { generateAxisTitles }
