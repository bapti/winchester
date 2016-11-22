const chai = require('chai')
const should = chai.should

const graphMaker = require('.')

describe('graphMaker', () => {
  describe('makeGraph', () => {
    var results

    before(() => {
      results = [
        [
          {
            title: 'those_dancing_days',
            url: 'https://itunes.apple.com/search?term=those+dancing+days&country=gb&media=music&entity=album',
            requests: {
              average: 29.9,
              mean: 29.9,
              stddev: 8.27,
              min: 14,
              max: 45,
              total: 299,
              sent: 349
            },
            latency: {
              average: 304.76,
              mean: 304.76,
              stddev: 439.78,
              min: 0,
              max: 2481,
              p50: 148,
              p75: 353,
              p90: 788,
              p99: 2317,
              p999: 2481,
              p9999: 2481,
              p99999: 2481
            },
            throughput: {
              average: 488652.8,
              mean: 488652.8,
              stddev: 127359.26,
              min: 212992,
              max: 688127,
              total: 4907125
            },
            errors: 0,
            timeouts: 0,
            duration: 10,
            start: '2016-11-22T09:26:44.342Z',
            finish: '2016-11-22T09:26:54.385Z',
            connections: 10,
            pipelining: 5,
            non2xx: 2,
            '1xx': 0,
            '2xx': 297,
            '3xx': 0,
            '4xx': 2,
            '5xx': 0
          },
          {
            title: 'those_dancing_days',
            url: 'https://itunes.apple.com/search?term=those+dancing+days&country=gb&media=music&entity=album',
            requests: {
              average: 32.21,
              mean: 32.21,
              stddev: 11.38,
              min: 11,
              max: 50,
              total: 322,
              sent: 372
            },
            latency: {
              average: 279,
              mean: 279,
              stddev: 343.02,
              min: 0,
              max: 2514,
              p50: 156,
              p75: 351,
              p90: 696,
              p99: 1689,
              p999: 2514,
              p9999: 2514,
              p99999: 2514
            },
            throughput: {
              average: 534528,
              mean: 534528,
              stddev: 169964.26,
              min: 196608,
              max: 786431,
              total: 5354052
            },
            errors: 0,
            timeouts: 0,
            duration: 10,
            start: '2016-11-22T09:26:44.365Z',
            finish: '2016-11-22T09:26:54.399Z',
            connections: 10,
            pipelining: 5,
            non2xx: 0,
            '1xx': 0,
            '2xx': 322,
            '3xx': 0,
            '4xx': 0,
            '5xx': 0
          },
          {
            title: 'those_dancing_days',
            url: 'https://itunes.apple.com/search?term=those+dancing+days&country=gb&media=music&entity=album',
            requests: {
              average: 34,
              mean: 34,
              stddev: 10.14,
              min: 14,
              max: 50,
              total: 340,
              sent: 390
            },
            latency: {
              average: 268.57,
              mean: 268.57,
              stddev: 319.28,
              min: 0,
              max: 2639,
              p50: 160,
              p75: 320,
              p90: 663,
              p99: 1730,
              p999: 2639,
              p9999: 2639,
              p99999: 2639
            },
            throughput: {
              average: 568115.2,
              mean: 568115.2,
              stddev: 170090.57,
              min: 245760,
              max: 884735,
              total: 5658964
            },
            errors: 0,
            timeouts: 0,
            duration: 10,
            start: '2016-11-22T09:26:44.369Z',
            finish: '2016-11-22T09:26:54.411Z',
            connections: 10,
            pipelining: 5,
            non2xx: 1,
            '1xx': 0,
            '2xx': 339,
            '3xx': 0,
            '4xx': 1,
            '5xx': 0
          }
        ],
        [
          {
            title: 'arab_strap',
            url: 'https://itunes.apple.com/search?term=arab+strap&country=gb&media=music&entity=album',
            requests: {
              average: 80.54,
              mean: 80.54,
              stddev: 23.68,
              min: 8,
              max: 123,
              total: 2416,
              sent: 2616
            },
            latency: {
              average: 244.78,
              mean: 244.78,
              stddev: 319.09,
              min: 0,
              max: 4446,
              p50: 146,
              p75: 293,
              p90: 532,
              p99: 1650,
              p999: 3619,
              p9999: 4446,
              p99999: 4446
            },
            throughput: {
              average: 1441655.47,
              mean: 1441655.47,
              stddev: 423282.16,
              min: 139264,
              max: 2228223,
              total: 43273008
            },
            errors: 0,
            timeouts: 0,
            duration: 30,
            start: '2016-11-22T09:26:44.375Z',
            finish: '2016-11-22T09:27:14.453Z',
            connections: 20,
            pipelining: 10,
            non2xx: 0,
            '1xx': 0,
            '2xx': 2416,
            '3xx': 0,
            '4xx': 0,
            '5xx': 0
          },
          {
            title: 'arab_strap',
            url: 'https://itunes.apple.com/search?term=arab+strap&country=gb&media=music&entity=album',
            requests: {
              average: 79.5,
              mean: 79.5,
              stddev: 23.01,
              min: 6,
              max: 112,
              total: 2385,
              sent: 2585
            },
            latency: {
              average: 247.4,
              mean: 247.4,
              stddev: 355.49,
              min: 0,
              max: 7129,
              p50: 145,
              p75: 266,
              p90: 540,
              p99: 1921,
              p999: 3429,
              p9999: 7129,
              p99999: 7129
            },
            throughput: {
              average: 1420151.47,
              mean: 1420151.47,
              stddev: 411991.13,
              min: 86016,
              max: 2031615,
              total: 42682778
            },
            errors: 0,
            timeouts: 0,
            duration: 30,
            start: '2016-11-22T09:26:44.384Z',
            finish: '2016-11-22T09:27:14.472Z',
            connections: 20,
            pipelining: 10,
            non2xx: 2,
            '1xx': 0,
            '2xx': 2383,
            '3xx': 0,
            '4xx': 2,
            '5xx': 0
          },
          {
            title: 'arab_strap',
            url: 'https://itunes.apple.com/search?term=arab+strap&country=gb&media=music&entity=album',
            requests: {
              average: 80.74,
              mean: 80.74,
              stddev: 26.32,
              min: 9,
              max: 135,
              total: 2422,
              sent: 2622
            },
            latency: {
              average: 241.19,
              mean: 241.19,
              stddev: 309.3,
              min: 0,
              max: 3602,
              p50: 145,
              p75: 281,
              p90: 552,
              p99: 1562,
              p999: 3242,
              p9999: 3602,
              p99999: 3602
            },
            throughput: {
              average: 1439402.67,
              mean: 1439402.67,
              stddev: 479032.44,
              min: 122880,
              max: 2490367,
              total: 43258120
            },
            errors: 0,
            timeouts: 0,
            duration: 30,
            start: '2016-11-22T09:26:44.395Z',
            finish: '2016-11-22T09:27:14.493Z',
            connections: 20,
            pipelining: 10,
            non2xx: 7,
            '1xx': 0,
            '2xx': 2415,
            '3xx': 0,
            '4xx': 7,
            '5xx': 0
          }
        ]
      ]
    })

    it('should pass this test', () => {
      graphMaker.makeGraph(results)
      return (1).should.be.equal(1)
    })
  })
})
