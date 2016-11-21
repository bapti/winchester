const autocannon = require('autocannon')

function leverAction(target) {
  const { url, connections, pipelining, duration, method, headers, body,
    body_file, title } = target

  return {
    url: url,
    connections: connections,
    pipelining: pipelining,
    duration: duration,
    method: method,
    headers: headers,
    body: body,
    body_file: body_file,
    title: title
  }
}

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
  return targets.map((target) => {
    const { repeat } = target
    const autocannonConfig = leverAction(target)

    const rounds = []
    for(var i = 0; i < repeat; i++) {
      rounds.push(singleShot(autocannonConfig))
    }

    return rounds
  })
}

const firingMechanism = {
  semiAutomatic: semiAutomatic,
  singleShot: singleShot
}

module.exports = firingMechanism
