'use strict'

const path = require('path')
const pug = require('pug')

const buildLatency = (title, style, script, mean, min, max, p50, p75, p90, p99) => {
  const meanMinMaxPath = path.join(__dirname, '../../static/pug/latency.pug')

  return pug.compileFile(meanMinMaxPath)({
    title: title,
    style: style,
    script: script,
    min: min,
    mean: mean,
    max: max,
    p50: p50,
    p75: p75,
    p90: p90,
    p99: p99
  })
}

module.exports = { buildLatency }
