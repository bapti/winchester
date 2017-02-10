'use strict'

const path = require('path')
const pug = require('pug')

const buildIndex = (title, style) => {
  const indexPath = path.join(__dirname, '../static/pug/index.pug')

  return pug.compileFile(indexPath)({ title: title, style: style })
}

module.exports = { buildIndex }
