'use strict'

const path = require('path')
const pug = require('pug')

const buildCount = (title, style, script, count) => {
  const countPath = path.join(__dirname, '../../static/pug/count.pug')

  return pug.compileFile(countPath)({
    title: title,
    style: style,
    script: script,
    count: count
  })
}

module.exports = { buildCount }
