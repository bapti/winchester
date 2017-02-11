const { generateErrors } = require('./errors')
const { generateLatency } = require('./latency')
const { generateRequests } = require('./requests')
const { generateThroughput } = require('./throughput')
const { generateTimeouts } = require('./timeouts')

module.exports = {
  generateErrors,
  generateLatency,
  generateRequests,
  generateThroughput,
  generateTimeouts
}
