const path = require('path')

const chai = require('chai')
const should = chai.should()

var sut = require('.')

describe('targetingComputer', () => {
  describe('alignSights', () => {
    describe('happy path', () => {
      var targetingFilePath
      var targetingConfigName
      var firstTarget, secondTarget, thirdTarget

      var result

      before(() => {
        targetingFilePath = '../../examples/targeting/happy-path/test.yml'
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

    describe('unhappy path:', () => {
      describe('missing url for targets', () => {
        var targetingFilePath
        var missingUrlTargetName

        before(() => {
          targetingFilePath = '../../examples/targeting/unhappy-path/missing-url.yml'
          missingUrlTargetName = 'missing_url_target'
        })

        it('should throw an error if targets do not have a url specified', () => {
          return (() => sut.alignSights(targetingFilePath)).should.throw(Error)
        })

        it('should throw an error specifying first target with missing url if one or more targets do not have a url specified', () => {
          return (() => sut.alignSights(targetingFilePath)).should.throw(`No URL specified for ${missingUrlTargetName}`)
        })
      })

      describe('missing body file for targets', () => {
        var targetingFilePath
        var missingBodyFileTargetName
        var missingBodyFilePath

        before(() => {
          targetingFilePath = '../../examples/targeting/unhappy-path/body-file-does-not-exist.yml'
          missingBodyFileTargetName = 'missing_body_file_target'
          missingBodyFilePath = '/Users/donald/JavaScript/winchester/examples/body/not-there.txt'
        })

        it('should throw an error if body file for target does not exist at path specified', () => {
          return (() => sut.alignSights(targetingFilePath)).should.throw(Error)
        })

        it('should throw an error specifying path of first missing body file if one or more targets exist with missing body files', () => {
          return (() => sut.alignSights(targetingFilePath)).should.throw(`ENOENT: no such file or directory, open '/Users/donald/JavaScript/winchester/examples/body/not-there.txt'`)
        })
      })
    })
  })
})
