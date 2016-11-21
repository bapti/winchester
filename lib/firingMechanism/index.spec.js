const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const mockery = require('mockery')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const EventEmitter = require('events')

chai.use(chaiAsPromised)
chai.use(sinonChai)
const should = chai.should

describe('firingMechanism', () => {
  describe('singleShot', () => {
    describe('happy path: test autocannon called correctly', () => {
      var sut
      var target
      var autocannon

      before(() => {
        mockery.enable({useCleanCache: true, warnOnUnregistered: false})

        target = {
          url: 'http://localhost:3000',
          connections: 10,
          pipelining: 1,
          duration: 10,
          method: 'GET',
          headers: [],
          body: undefined,
          body_file: undefined,
          title: 'default_target'
        }
      })

      beforeEach(() => {
        autocannon = sinon.spy(() => new EventEmitter())
        mockery.registerMock('autocannon', autocannon)

        sut = require('.')
        sut.singleShot(target)
      })

      it('should call autocannon', () => {
        autocannon.called.should.be.equal(true)
      })

      it('should call autocannon with target', () => {
        autocannon.calledWith(target).should.be.equal(true)
      })

      afterEach(() => {
        mockery.deregisterAll()
        mockery.resetCache()
      })

      after(() => {
        mockery.disable()
      })
    })

    describe('happy path: test results returned correctly', () => {
      var sut
      var target
      var result

      before(() => {
        sut = require('.')

        target = {
          url: 'http://localhost:3000',
          connections: 10,
          pipelining: 1,
          duration: 1,
          method: 'GET',
          headers: [],
          body: undefined,
          body_file: undefined,
          title: 'default_target'
        }

        result = sut.singleShot(target)
      })

      it('should eventually return an object', () => {
        return result.should.eventually.be.an('object')
      })
    })

    describe('unhappy path: invalid url should cause a request error to be returned', () => {
      var sut
      var target
      var result

      before(() => {
        sut = require('.')

        target = {
          url: 'http://localhost:2999',
          connections: 10,
          pipelining: 1,
          duration: 1,
          method: 'GET',
          headers: [],
          body: undefined,
          body_file: undefined,
          title: 'default_target'
        }

        result = sut.singleShot(target)
      })

      it('should eventually reject with Request Error', () => {
        result.should.be.rejectedWith('Error: Request Error')
      })
    })
  })

  describe('semiAutomatic', () => {
    describe('happy path: test autocannon called correctly', () => {
      var sut
      var targets
      var firstTarget, secondTarget, thirdTarget
      var firstAutocannon, secondAutocannon, thirdAutocannon
      var autocannon

      before(() => {
        mockery.enable({useCleanCache: true, warnOnUnregistered: false})

        firstAutocannon = {
          url: 'http://localhost:3000',
          connections: 10,
          pipelining: 1,
          duration: 10,
          method: 'GET',
          headers: [],
          body: undefined,
          body_file: undefined,
          title: 'default_target'
        }
        firstTarget = Object.assign({}, firstAutocannon, { repeat: 1 })

        secondAutocannon = {
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
          title: 'body_target'
        }
        secondTarget = Object.assign({}, secondAutocannon, { repeat: 2 })

        thirdAutocannon = {
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
          title: 'body_file_target'
        }
        thirdTarget = Object.assign({}, thirdAutocannon, { repeat: 3 })

        targets = [ firstTarget, secondTarget, thirdTarget ]
      })

      beforeEach(() => {
        autocannon = sinon.spy(() => new EventEmitter())
        mockery.registerMock('autocannon', autocannon)

        sut = require('.')
        sut.semiAutomatic(targets)
      })

      it('should call autocannon', () => {
        autocannon.called.should.be.equal(true)
      })

      it('should call autocannon the specified number of times for each target in targets array', () => {
        autocannon.callCount.should.be.equal(6)
      })

      it('should call autocannon with first target', () => {
        autocannon.calledWith(firstAutocannon).should.be.equal(true)
      })

      it('should call autocannon with second target', () => {
        autocannon.calledWith(secondAutocannon).should.be.equal(true)
      })

      it('should call autocannon with third target', () => {
        autocannon.calledWith(thirdAutocannon).should.be.equal(true)
      })

      afterEach(() => {
        mockery.deregisterAll()
        mockery.resetCache()
      })

      after(() => {
        mockery.disable()
      })
    })

    describe('happy path: test results returned correctly', () => {
      var sut
      var targets
      var results

      before(() => {
        sut = require('.')

        targets = [
          {
            url: 'http://localhost:3000',
            connections: 10,
            pipelining: 1,
            duration: 1,
            method: 'GET',
            headers: [],
            body: undefined,
            body_file: undefined,
            title: 'default_target',
            repeat: 2
          }
        ]

        results = sut.semiAutomatic(targets)
      })

      it('should return an array', () => {
        return results.should.be.an('array')
      })

      it('should return an array with one array for each target', () => {
        return results.length.should.be.equal(1)
      })

      it('should return an array of with an array of  promises able to be resolved to result objects', () => {
        return results[0][0].should.eventually.be.an('object')
      })
    })
  })
})
