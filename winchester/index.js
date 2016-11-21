const targetingComputer = require('./targetingComputer')
const firingMechanism = require('./firingMechanism')

function readyAimFire(configPath) {
  const targets = targetingComputer.alignSights(configPath)
  const resultPromises = firingMechanism.fire(targets)
  const results = resultPromises.map((rp) => rp.then(res => res, err => null))

  console.log(results)
}

const winchester = {
  readyAimFire: readyAimFire
}

module.exports = winchester
