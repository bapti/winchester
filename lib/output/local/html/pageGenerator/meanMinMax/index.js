'use strict'

const path = require('path')
const pug = require('pug')

const buildMeanMinMax = (title, style, script, mean, min, max) => {
  const meanMinMaxPath = path.join(__dirname, '../../static/pug/meanMinMax.pug')

  return pug.compileFile(meanMinMaxPath)({
    title: title,
    style: style,
    script: script,
    min: min,
    mean: mean,
    max: max
  })
}

module.exports = { buildMeanMinMax }
