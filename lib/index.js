const targetingComputer = require('./targetingComputer')
const firingMechanism = require('./firingMechanism')

function readyAimFire(projectRoot, configPath) {
  const targets = targetingComputer.alignSights(projectRoot, configPath)
  return firingMechanism.semiAutomatic(targets)
}

const winchester = {
  readyAimFire: readyAimFire
}

module.exports = winchester
