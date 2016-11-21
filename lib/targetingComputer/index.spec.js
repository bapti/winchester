const path = require('path')

const chai = require('chai')
const should = chai.should()

const sut = require('.')

describe('targetingComputer', () => {
  describe('alignSights', () => {
    describe('happy path', () => {
      var targetingFilePath
      var targetingConfigName
      var expected

      var actual

      before(() => {
        targetingFilePath = 'examples/targeting/happy-path/test.yml'
        targetingConfigName = 'test_targeting_config'

        expected = [
          {
            url: 'http://localhost:3000',
            connections: 10,
            pipelining: 1,
            duration: 10,
            method: 'GET',
            headers: [],
            body: undefined,
            body_file: undefined,
            title: 'default_target',
            repeat: 1
          },
          {
            url: 'http://localhost:3001',
            connections: 100,
            pipelining: 10,
            duration: 100,
            method: 'POST',
            headers: [
              'content-type', 'application/json'
            ],
            body: 'body',
            body_file: undefined,
            title: 'body_target',
            repeat: 2
          },
          {
            url: 'http://localhost:3002',
            connections: 1000,
            pipelining: 100,
            duration: 1000,
            method: 'PATCH',
            headers: [
              'accept', 'application/json'
            ],
            body: 'Work the body, work work the body',
            body_file: '/Users/donald/JavaScript/winchester/examples/body/test.txt',
            title: 'body_file_target',
            repeat: 3
          }
        ]

        actual = sut.alignSights(path.join(__dirname, '../..'), targetingFilePath)
      })

      it('should return an array', () => {
        return actual.should.be.an('array')
      })

      it('should return an array matching the expected array', () => {
        return actual.should.be.deep.equal(expected)
      })
    })

    describe('unhappy path:', () => {
      describe('missing url for targets', () => {
        var targetingFilePath
        var missingUrlTargetName

        before(() => {
          targetingFilePath = 'examples/targeting/unhappy-path/missing-url.yml'
          missingUrlTargetName = 'missing_url_target'
        })

        it('should throw an error if targets do not have a url specified', () => {
          return (() => sut.alignSights(path.join(__dirname, '../..'), targetingFilePath)).should.throw(Error)
        })

        it('should throw an error specifying first target with missing url if one or more targets do not have a url specified', () => {
          return (() => sut.alignSights(path.join(__dirname, '../..'), targetingFilePath)).should.throw(`No URL specified for ${missingUrlTargetName}`)
        })
      })

      describe('missing body file for targets', () => {
        var targetingFilePath
        var missingBodyFileTargetName
        var missingBodyFilePath

        before(() => {
          targetingFilePath = 'examples/targeting/unhappy-path/body-file-does-not-exist.yml'
          missingBodyFileTargetName = 'missing_body_file_target'
          missingBodyFilePath = '/Users/donald/JavaScript/winchester/examples/body/not-there.txt'
        })

        it('should throw an error if body file for target does not exist at path specified', () => {
          return (() => sut.alignSights(path.join(__dirname, '../..'), targetingFilePath)).should.throw(Error)
        })

        it('should throw an error specifying path of first missing body file if one or more targets exist with missing body files', () => {
          return (() => sut.alignSights(path.join(__dirname, '../..'), targetingFilePath)).should.throw(`ENOENT: no such file or directory, open '/Users/donald/JavaScript/winchester/examples/body/not-there.txt'`)
        })
      })
    })
  })
})
