'use strict'

const fs = require('fs')

const read = (path) => {
  const opts = { encoding: 'utf8', flag: 'r' }
  const str = fs.readFileSync(path, opts)

  return str
}

module.exports = { read }
