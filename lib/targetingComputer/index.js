const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const defaultConfig = require('./defaultConfig')

function steadyAim(target, targetName) {
  target = Object.assign({}, defaultConfig, target, { title: targetName })

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

function alignSights(projectRoot, configPath) {
  const absolutePath = path.join(projectRoot, configPath)
  console.log(`Reading config from ${absolutePath}`)
  const configString = fs.readFileSync(absolutePath).toString()
  console.log('Parsing config')
  const config = yaml.load(configString)
  console.log('Filling sights')
  const filledConfig = fillSights(config)

  return lineUpTargets(filledConfig)
}

const targetingComputer = {
  alignSights: alignSights
}

module.exports = targetingComputer
