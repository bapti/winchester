const targetingComputer = require('./targetingComputer')
const firingMechanism = require('./firingMechanism')

function readyAimFire(configPath) {
  const targets = targetingComputer.alignSights(configPath)
  return firingMechanism.semiAutomatic(targets)
}

const winchester = {
  readyAimFire: readyAimFire
}

module.exports = winchester
