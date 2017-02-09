'use strict'

const defaultTarget = {
  title: undefined,
  url: undefined,
  connections: 10,
  pipelining: 1,
  duration: 10,
  method: 'GET',
  headers: {},
  body: undefined,
  body_file: undefined,
  id_replacement: false,
  title: undefined
}

const defaultOutput = {
  local: true,
  statsd: {
    host: 'localhost',
    port: 8125,
    prefix: 'local.api'
  }
}

module.exports = { defaultTarget, defaultOutput }
