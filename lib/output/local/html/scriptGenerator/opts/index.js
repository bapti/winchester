'use strict'

const generateLineOpts = (chartPlugins) => {
  const padding = `{ left: 100, right: 80, top: 20, bottom: 30 }`
  const plugins = chartPlugins.reduce((a, c) => `${a}, ${c}`)

  return `{ fullWidth: true, height: '500px', chartPadding: ${padding}, plugins: [ ${plugins} ]}`
}

const generateStackedBarOpts = (chartPlugins) => {
  const padding = `{ left: 100, right: 80, top: 20, bottom: 30 }`
  const plugins = chartPlugins.reduce((a, c) => `${a}, ${c}`)

  return `{ stackBars: true, fullWidth: true, height: '500px', chartPadding: ${padding}, plugins: [ ${plugins} ]}`
}

module.exports = { generateLineOpts, generateStackedBarOpts }
