const autocannon = require('autocannon')

function singleShot(target) {
  return new Promise((resolve, reject) => {
    const instance = autocannon(target)

    instance.on('done', (results) => {
      resolve(results)
    })

    instance.on('reqError', (err) => {
      console.error(err)
      reject(null)
    })

    instance.on('error', (err) => {
      console.error(err)
      reject(null)
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
