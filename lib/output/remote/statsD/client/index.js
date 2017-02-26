'use strict'

const StatsD = require('hot-shots')

const createClient = (config) => {
  const host = config.host
  const port = config.port
  const prefix = config.prefix

  const client = new StatsD({ host: host, port: port, prefix: prefix })

  client.socket.on('error', err => {
    /* eslint-disable no-console */
    console.error('StatsD Client: Socket Error:', err)
    /* eslint-enable no-console */
  })

  return client
}

module.exports = createClient
