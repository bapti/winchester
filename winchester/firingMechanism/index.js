const autocannon = require('autocannon')

function fire(targets) {
  const resultSet = []

  for(var i = 0; i < targets.length; i++) {
    autocannon(targets[i], (err, results) => {
      if(err) console.error(err)
      resultSet.push(results)
    })
  }

  return resultSet
}

const firingMechanism = {
  fire: fire
}

module.exports = firingMechanism
