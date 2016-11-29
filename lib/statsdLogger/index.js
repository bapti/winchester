const statsd = require('statsd-client')

function initClient({ host, port, prefix }) {
  return new statsd({
    host: host,
    port: port,
    prefix: prefix
  })
}

function logResponseTimeMetrics(statsdConfig, requests) {
  const config = Object.assign({}, statsdConfig, {
    prefix: `${statsdConfig.globalPrefix}.response_time`
  })

  const client = initClient(config)

  // client.gauge('min', requests.min)
  console.log(`${client.options.prefix}min ${requests.min}`)
  // client.gauge('max', requests.max)
  console.log(`${client.options.prefix}max ${requests.max}`)
  // client.gauge('avg', requests.average)
  console.log(`${client.options.prefix}avg ${requests.average}`)

  // setTimeout(client.close, 2000)
}

function logLatencyMetrics(statsdConfig, latency) {
  const config = Object.assign({}, statsdConfig, {
    prefix: `${statsdConfig.globalPrefix}.latency`
  })

  const client = initClient(config)

  // client.gauge('min', latency.min)
  console.log(`${client.options.prefix}min ${latency.min}`)
  // client.gauge('max', latency.max)
  console.log(`${client.options.prefix}max ${latency.max}`)
  // client.gauge('avg', latency.average)
  console.log(`${client.options.prefix}avg ${latency.average}`)
  // client.gauge('p50', latency.p50)
  console.log(`${client.options.prefix}p50 ${latency.p50}`)
  // client.gauge('p75', latency.p75)
  console.log(`${client.options.prefix}p75 ${latency.p75}`)
  // client.gauge('p90', latency.p90)
  console.log(`${client.options.prefix}p90 ${latency.p90}`)
  // client.gauge('p99', latency.p99)
  console.log(`${client.options.prefix}p99 ${latency.p99}`)
  // client.gauge('p9999', latency.p9999)
  console.log(`${client.options.prefix}p9999 ${latency.p9999}`)

  // setTimeout(client.close, 2000)
}

function logThroughputMetrics(statsdConfig, throughput) {
  const config = Object.assign({}, statsdConfig, {
    prefix: `${statsdConfig.globalPrefix}.throughput`
  })

  const client = initClient(config)

  // client.gauge('min', throughput.min)
  console.log(`${client.options.prefix}min ${throughput.min}`)
  // client.gauge('max', throughput.max)
  console.log(`${client.options.prefix}max ${throughput.max}`)
  // client.gauge('avg', throughput.average)
  console.log(`${client.options.prefix}avg ${throughput.average}`)

  // setTimeout(client.close, 2000)
}

function logErrorMetrics(statsdConfig, errors) {
  const config = Object.assign({}, statsdConfig, {
    prefix: `${statsdConfig.globalPrefix}.errors`
  })

  const client = initClient(config)

  // client.gauge('count', errors)
  console.log(`${client.options.prefix}count ${errors}`)

  // setTimeout(client.close, 2000)
}

function logTimeoutMetrics(statsdConfig, timeouts) {
  const config = Object.assign({}, statsdConfig, {
    prefix: `${statsdConfig.globalPrefix}.timeouts`
  })

  const client = initClient(config)

  // client.gauge('count', timeouts)
  console.log(`${client.options.prefix}count ${timeouts}`)

  // setTimeout(client.close, 2000)
}

function logToStatsd(statsdConfig, resultRows) {
  resultRows.forEach(row => {
    row.forEach(result => {
      logResponseTimeMetrics(statsdConfig, result.requests)
      logLatencyMetrics(statsdConfig, result.latency)
      logThroughputMetrics(statsdConfig, result.throughput)
      logErrorMetrics(statsdConfig, result.errors)
      logTimeoutMetrics(statsdConfig, result.timeouts)
    })
  })
}

const statsdLogger = {
  logToStatsd: logToStatsd
}

module.exports = statsdLogger
