'use strict'

const isBool = key => is('boolean')(key)
const isNum = key => is('number')(key)
const isObj = key => is('object')(key)
const isStr = key => is('string')(key)

const is = type => key => typeof key === type

module.exports = { isBool, isNum, isObj, isStr }
