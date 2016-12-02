'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const defaults = require('./defaultConfig')

function steadyAim(target, targetName) {
  target = Object.assign({}, defaults.target, target, { title: targetName })

  if(target.url === undefined) {
    throw new Error(`No URL specified for ${targetName}`)
  }

  if(target.body_file) {
    target.body = fs.readFileSync(target.body_file).toString().trim()
  }

  return target
}

function fillSights(config) {
  const configKey = Object.keys(config)[0]

  const targets = config[configKey]
  const targetKeys = Object.keys(targets)

  for(var i = 0; i < targetKeys.length; i++) {
    targets[targetKeys[i]] = steadyAim(targets[targetKeys[i]], targetKeys[i])
  }

  config[configKey] = targets

  return config
}

function lineUpTargets(config) {
  const configKey = Object.keys(config)[0]

  const targets = config[configKey]
  const targetKeys = Object.keys(targets)

  const targetList = []
  for(var i = 0; i < targetKeys.length; i++) {
    targetList.push(targets[targetKeys[i]])
  }

  return targetList
}

function alignSights(configPath) {
  console.log(`Reading config from ${configPath}`)
  const configString = fs.readFileSync(configPath).toString()
  console.log('Parsing config')
  const config = yaml.load(configString)
  console.log('Filling sights')
  const filledConfig = fillSights(config)
  const targetArray = lineUpTargets(filledConfig)

  return {
    targets: targetArray,
    output: Object.assign({}, defaults.output, config.output)
  }
}

const targetingComputer = {
  alignSights: alignSights
}

module.exports = targetingComputer
