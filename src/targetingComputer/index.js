const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const defaultConfig = require('./defaultConfig')

function steadyAim(target, targetName) {
  target = Object.assign({}, defaultConfig, target)

  if(target.url === undefined) {
    throw new Error(`No URL specified for ${targetName}`)
  }

  target.body = target.body_file
    ? fs.readFileSync(target.body_file).toString().trim()
    : target.body

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

function alignSights(configPath) {
  const absolutePath = path.join(__dirname, configPath)
  const configString = fs.readFileSync(absolutePath).toString()
  const config = yaml.load(configString)

  return fillSights(config)
}

const targetingComputer = {
  alignSights: alignSights
}

module.exports = targetingComputer
