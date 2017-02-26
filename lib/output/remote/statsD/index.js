'use strict'

const createClient = require('./client')

const outputStatsD = (title, results, config) => {
  const client = createClient(config)

  results.forEach(rr => {
    rr.forEach(r => {
      logErrorsMetrics(title, client, r)
      logLatencyMetrics(title, client, r)
      logRequestMetrics(title, client, r)
      logThroughputMetrics(title, client, r)
      logTimeoutsMetrics(title, client, r)
    })
  })

  client.close(err => {
    if (err) {
      /* eslint-disable no-console */
      console.error(err)
      /* eslint-enable no-console */
    } else {
      /* eslint-disable no-console */
      console.log(`All ${title} metrics sent to StatsD!`)
      /* eslint-enable no-console */
    }
  })
}

module.exports = outputStatsD

const logErrorsMetrics = (title, client, result) => {
  /* eslint-disable no-console */
  console.log(`Sending ${title} - Error Metrics to StatsD`)
  /* eslint-enable no-console */

  client.gauge('errors.count', result.errors)
}

const logLatencyMetrics = (title, client, result) => {
  /* eslint-disable no-console */
  console.log(`Sending ${title} - Latency Metrics to StatsD`)
  /* eslint-enable no-console */

  client.gauge('latency.min', result.latency.min)
  client.gauge('latency.mean', result.latency.mean)
  client.gauge('latency.max', result.latency.max)
  client.gauge('latency.p50', result.latency.p50)
  client.gauge('latency.p75', result.latency.p75)
  client.gauge('latency.p90', result.latency.p90)
  client.gauge('latency.p99', result.latency.p99)
}

const logRequestMetrics = (title, client, result) => {
  /* eslint-disable no-console */
  console.log(`Sending ${title} - Request Metrics to StatsD`)
  /* eslint-enable no-console */

  client.gauge('requests.min', result.requests.min)
  client.gauge('requests.mean', result.requests.mean)
  client.gauge('requests.max', result.requests.max)
}

const logThroughputMetrics = (title, client, result) => {
  /* eslint-disable no-console */
  console.log(`Sending ${title} - Throughput Metrics to StatsD`)
  /* eslint-enable no-console */

  client.gauge('throughput.min', result.throughput.min)
  client.gauge('throughput.mean', result.throughput.mean)
  client.gauge('throughput.max', result.throughput.max)
}

const logTimeoutsMetrics = (title, client, result) => {
  /* eslint-disable no-console */
  console.log(`Sending ${title} - Timeouts Metrics to StatsD`)
  /* eslint-enable no-console */

  client.gauge('timeouts.count', result.timeouts)
}
