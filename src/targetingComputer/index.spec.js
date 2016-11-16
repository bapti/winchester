const path = require('path')

const chai = require('chai')
const should = chai.should()

var sut = require('.')

describe('targetingComputer', () => {
  describe('alignSights', () => {
    var targetingFilePath
    var targetingConfigName
    var firstTarget, secondTarget, thirdTarget

    var result

    before(() => {
      targetingFilePath = '../../examples/targeting/test.yml'
      targetingConfigName = 'test_targeting_config'

      firstTarget = {
        url: 'http://localhost:3000',
        connections: 10,
        pipelining: 1,
        duration: 10,
        method: 'GET',
        headers: [],
        body: undefined,
        body_file: undefined
      }

      secondTarget = {
        url: 'http://localhost:3001',
        connections: 100,
        pipelining: 10,
        duration: 100,
        method: 'POST',
        headers: [
          'content-type', 'application/json'
        ],
        body: 'body',
        body_file: undefined
      }

      thirdTarget = {
        url: 'http://localhost:3002',
        connections: 1000,
        pipelining: 100,
        duration: 1000,
        method: 'PATCH',
        headers: [
          'accept', 'application/json'
        ],
        body: 'Work the body, work work the body',
        body_file: '/Users/donald/JavaScript/winchester/examples/body/test.txt'
      }

      result = sut.alignSights(targetingFilePath)
    })

    it('should return an object', () => {
      return result.should.be.an('object')
    })

    it('should return an object with a single field matching the targeting config name', () => {
      return Object.keys(result).every(key => key === targetingConfigName).should.be.equal(true)
    })

    it('should return an object with an inner object - default_target - matching the expected object', () => {
      return result.test_targeting_config.default_target.should.be.deep.equal(firstTarget)
    })

    it('should return an object with an inner object - body_target - matching the expected object', () => {
      return result.test_targeting_config.body_target.should.be.deep.equal(secondTarget)
    })

    it('should return an object with an inner object - body_file_target - matching the expected object', () => {
      return result.test_targeting_config.body_file_target.should.be.deep.equal(thirdTarget)
    })
  })
})
