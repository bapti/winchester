'use strict'

const defaultTarget = require('../default')

const buildTargets = (config, repeat) => {
  const targets = config.targets

  const targetLists = targets
    .map(t => Object.assign({}, defaultTarget, t))
    .map(t => repeatTarget(t, repeat))

  return targetLists
}

module.exports = buildTargets

const repeatTarget = (target, repeat) => {
  const targetList = []
  for (let i = 0; i < repeat; i++) targetList.push(target)

  return targetList
}
