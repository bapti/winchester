'use strict'

const path = require('path')
const pug = require('pug')

const buildGraph = (title, template) => {
  const graph = path.join(__dirname, `../../static/pug/${template}.pug`)

  return pug.compileFile(graph)({ title: title })
}

module.exports = { buildGraph }
