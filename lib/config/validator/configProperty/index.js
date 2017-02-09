'use strict'

const validateConfig = (config) => {
  const configKeys = Object.keys(config)

  if (!configKeys.includes('title')) throw new Error('Config has no title.')
  if (typeof config.title !== 'string') throw new Error('Config title is not a string.')

  if (!configKeys.includes('targets')) throw new Error('Config has no targets.')
  if (!Array.isArray(config.targets)) throw new Error('Targets is not an array.')

  if (configKeys.includes('output') && typeof config.output !== 'object') throw new Error('Output is not an object.')

  return true
}

module.exports = { validateConfig }
