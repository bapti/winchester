'use strict'

const validateTarget = (target) => {
  // must have a title
  // title must be a string

  // must have a url
  // url must be a string

  // connections must be an integer
  // pipelining must be an integer
  // duration must be an integer
  // method must be a string from the set:
  //    GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH
  // headers must be an object

  // body must be a string
  // body_file must be a string
  // if body AND body_file are non-empty strings, a warning should be displayed
  // using console.error, an exception should NOT be thrown

  // id_replacement must be a boolean

  return true
}

module.exports = { validateTarget }
