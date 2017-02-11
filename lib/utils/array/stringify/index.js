'use strict'

const stringifyReducer = (arr) => arr.reduce(a, c => `${a}, ${c}`)

module.exports = { stringifyReducer }
