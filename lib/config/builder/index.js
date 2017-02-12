'use strict'

const { defaultTarget, defaultOutput } = require('../default')

const buildTargets = (config, repeat) => {
  const targets = config.targets

  const targetLists = targets
    .map(t => Object.assign({}, defaultTarget, t))
    .map(t => repeatTarget(t, repeat))

  return targetLists
}

const buildOutput = (config) => {
  const output = config.output

  return Object.assign({}, defaultOutput, output)
}

module.exports = { buildTargets, buildOutput }

const repeatTarget = (target, repeat) => {
  const targetList = []
  for (let i = 0; i < repeat; i++) targetList.push(target)

  return targetList
}
