'use strict'

const StatsD = require('hot-shots')

const createClient = (config) => {
  const { host, port, prefix } = config
  const client = new StatsD({ host: host, port: port, prefix: prefix })

  client.socket.on('error', err => {
    console.error('StatsD Client: Socket Error:', err)
  })

  return client
}

module.exports = { createClient }
