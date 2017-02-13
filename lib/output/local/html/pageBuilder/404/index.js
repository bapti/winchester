'use strict'

const path = require('path')
const pug = require('pug')

const build404 = (title, error) => {
  const indexPath = path.join(__dirname, '../../static/pug/404.pug')

  return pug.compileFile(indexPath)({ title: title, error: error })
}

module.exports = { build404 }
