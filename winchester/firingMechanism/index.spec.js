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
  describe('semiAutomatic', () => {
    describe('happy path: test autocannon called correctly', () => {
      var sut
      var targets
      var firstTarget, secondTarget, thirdTarget
      var autocannon

      before(() => {
        mockery.enable({useCleanCache: true, warnOnUnregistered: false})

        firstTarget = {
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
          body_file: undefined,
          title: 'body_target'
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
          body_file: '/Users/donald/JavaScript/winchester/examples/body/test.txt',
          title: 'body_file_target'
        }

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

      it('should call autocannon once for each target in targets array', () => {
        autocannon.callCount.should.be.equal(3)
      })

      it('should call autocannon with first target', () => {
        autocannon.calledWith(firstTarget).should.be.equal(true)
      })

      it('should call autocannon with second target', () => {
        autocannon.calledWith(secondTarget).should.be.equal(true)
      })

      it('should call autocannon with third target', () => {
        autocannon.calledWith(thirdTarget).should.be.equal(true)
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
            duration: 10,
            method: 'GET',
            headers: [],
            body: undefined,
            body_file: undefined,
            title: 'default_target'
          }
        ]

        results = sut.semiAutomatic(targets)
      })

      it('should return an array', () => {
        return results.should.be.an('array')
      })

      it('should return an array with one result promise for each target', () => {
        return results.length.should.be.equal(1)
      })
    })
  })
})
