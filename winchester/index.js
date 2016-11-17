const targetingComputer = require('./targetingComputer')
const firingMechanism = require('./firingMechanism')

function readyAimFire(configPath) {
  const targets = targetingComputer.alignSights(configPath)
  const results = firingMechanism.fire(targets)

  /* eslint-disable no-console */
  console.log(results)
  /* eslint-enable no-console */
}

const winchester = {
  readyAimFire: readyAimFire
}

module.exports = winchester
