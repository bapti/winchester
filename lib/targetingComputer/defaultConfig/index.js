'use strict'

const defaultTarget = {
  url: undefined,
  connections: 10,
  pipelining: 1,
  duration: 10,
  method: 'GET',
  headers: {},
  body: undefined,
  body_file: undefined,
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

const defaults = {
  target: defaultTarget,
  output: defaultOutput
}

module.exports = defaults
