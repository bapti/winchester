
const plugins = [ axisTitles, pointLabels ]

'use strict'

const generateOpts = (chartPlugins) => {
  const padding = `{ left: 100, right: 80, top: 20, bottom: 30 }`
  const plugins = chartPlugins.reduce((a, c) => `${a}, ${c}`)

  return `{ fullWidth: true, height: '500px', chartPadding: ${padding}, plugins: [ ${plugins} ]}`
}

module.exports = { generateOpts }
