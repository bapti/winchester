'use strict'

const { stringify } = require('../../../../../utils/array/stringify')

const generateLegend = (legendNames) => {
  const names = `[ ${stringify(legendNames)} ]`

  return `Chartist.plugins.legend({ legendNames: ${names} })`
}

module.exports = { generateLegend }
