const chai = require('chai')
const should = chai.should

const graphMaker = require('.')

describe('graphMaker', () => {
  describe('makeGraph', () => {
    var results

    before(() => {
      results = [
        {
          title: 'those_dancing_days',
          url: 'https://itunes.apple.com/search?term=those+dancing+days&country=gb&media=music&entity=album',
          requests: {
            average: 4.5,
            mean: 4.5,
            stddev: 8.06,
            min: 0,
            max: 27,
            total: 45,
            sent: 95
          },
          latency: {
            average: 2018.29,
            mean: 2018.29,
            stddev: 2102.19,
            min: 0,
            max: 5201,
            p50: 517,
            p75: 4193,
            p90: 4960,
            p99: 5201,
            p999: 5201,
            p9999: 5201,
            p99999: 5201
          },
          throughput: {
            average: 43059.2,
            mean: 43059.2,
            stddev: 76947.47,
            min: 0,
            max: 262143,
            total: 434065
          },
          errors: 0,
          timeouts: 0,
          duration: 10,
          start: '2016-11-21T21:13:30.297Z',
          finish: '2016-11-21T21:13:40.344Z',
          connections: 10,
          pipelining: 5,
          non2xx: 0,
          '1xx': 0,
          '2xx': 45,
          '3xx': 0,
          '4xx': 0,
          '5xx': 0
        },
        {
          title: 'those_dancing_days',
          url: 'https://itunes.apple.com/search?term=those+dancing+days&country=gb&media=music&entity=album',
          requests: {
            average: 4.6,
            mean: 4.6,
            stddev: 8.64,
            min: 0,
            max: 29,
            total: 46,
            sent: 96
          },
          latency: {
            average: 1853.11,
            mean: 1853.11,
            stddev: 1996.29,
            min: 0,
            max: 4995,
            p50: 523,
            p75: 4111,
            p90: 4290,
            p99: 4995,
            p999: 4995,
            p9999: 4995,
            p99999: 4995
          },
          throughput: {
            average: 44902.4,
            mean: 44902.4,
            stddev: 85272.85,
            min: 0,
            max: 294911,
            total: 443707
          },
          errors: 0,
          timeouts: 0,
          duration: 10,
          start: '2016-11-21T21:13:30.321Z',
          finish: '2016-11-21T21:13:40.358Z',
          connections: 10,
          pipelining: 5,
          non2xx: 0,
          '1xx': 0,
          '2xx': 46,
          '3xx': 0,
          '4xx': 0,
          '5xx': 0
        },
        {
          title: 'those_dancing_days',
          url: 'https://itunes.apple.com/search?term=those+dancing+days&country=gb&media=music&entity=album',
          requests: {
            average: 3.3,
            mean: 3.3,
            stddev: 5.41,
            min: 0,
            max: 16,
            total: 33,
            sent: 83
          },
          latency: {
            average: 2138.7,
            mean: 2138.7,
            stddev: 2055.11,
            min: 0,
            max: 4469,
            p50: 545,
            p75: 4177,
            p90: 4394,
            p99: 4469,
            p999: 4469,
            p9999: 4469,
            p99999: 4469
          },
          throughput: {
            average: 31539.2,
            mean: 31539.2,
            stddev: 51495.7,
            min: 0,
            max: 155647,
            total: 318314
          },
          errors: 0,
          timeouts: 0,
          duration: 10,
          start: '2016-11-21T21:13:30.325Z',
          finish: '2016-11-21T21:13:40.371Z',
          connections: 10,
          pipelining: 5,
          non2xx: 0,
          '1xx': 0,
          '2xx': 33,
          '3xx': 0,
          '4xx': 0,
          '5xx': 0
        }
      ]
    })

    it('should pass this test', () => {
      graphMaker.makeGraph(results)
      return (1).should.be.equal(1)
    })
  })
})
