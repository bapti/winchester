const { generateErrors } = require('./scriptGenerator/errors')
const { generateLatency } = require('./scriptGenerator/latency')
const { generateRequests } = require('./scriptGenerator/requests')
const { generateThroughput } = require('./scriptGenerator/throughput')
const { generateTimeouts } = require('./scriptGenerator/timeouts')

module.exports = {
  generateErrors,
  generateLatency,
  generateRequests,
  generateThroughput,
  generateTimeouts
}
