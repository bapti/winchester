'use strict'

const stringify = arr => arr.reduce((a, c) => `${a}, ${c}`)

module.exports = { stringify }
