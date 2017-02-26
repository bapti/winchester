'use strict'

const tap = require('tap')
const test = tap.test

const buildTargets = require('.')
const defaultTarget = require('../default')

test('buildTargets', t => {
  t.plan(1)

  const input = { targets: [ { title: 'one', url: 'url.co.uk' }, { title: 'two', url: 'url.com' } ] }
  const targetOne = Object.assign({}, defaultTarget, input.targets[0])
  const targetTwo = Object.assign({}, defaultTarget, input.targets[1])

  const expected = [
    [ targetOne, targetOne, targetOne ],
    [ targetTwo, targetTwo, targetTwo ]
  ]

  t.same(buildTargets(input, 3), expected)
})
