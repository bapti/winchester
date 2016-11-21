const autocannon = require('autocannon')

function singleShot(target) {
  return new Promise((resolve, reject) => {
    const instance = autocannon(target)

    instance.on('done', (results) => {
      resolve(results)
    })

    instance.on('reqError', () => {
      reject(Error('Request Error'))
    })
  })
}

function semiAutomatic(targets) {
  return targets.map(target => singleShot(target))
}

const firingMechanism = {
  semiAutomatic: semiAutomatic,
  singleShot: singleShot
}

module.exports = firingMechanism
