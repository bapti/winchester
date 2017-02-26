'use strict'

const tap = require('tap')
const test = tap.test

const is = require('.')
const isBool = is.isBool
const isNum = is.isNum
const isObj = is.isObj
const isStr = is.isStr

test('isBool', t => {
  t.plan(2)

  t.ok(isBool(true))
  t.notOk(isBool(1))
})

test('isNum', t => {
  t.plan(2)

  t.ok(isNum(1))
  t.notOk(isNum('one'))
})

test('isObj', t => {
  t.plan(2)

  t.ok(isObj({ field: 'value' }))
  t.notOk(isObj(1))
})

test('isStr', t => {
  t.plan(2)

  t.ok(isStr('str'))
  t.notOk(isStr(1))
})
