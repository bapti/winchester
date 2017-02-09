'use strict'

const { defaultTarget, defaultOutput } = require('../default')

const buildTargets = (config, repeat) => {
  const targets = config.targets

  const targetLists = targets
    .map(t => Object.assign({}, defaultTarget, t))
    .map(t => new Array(repeat).fill(t))

  return targetLists
}

const buildOutput = (config) => {
  const output = config.output

  return Object.assign({}, defaultOutput, output)
}

module.exports = { buildTargets, buildOutput }
