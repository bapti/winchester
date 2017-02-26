'use strict'

const fs = require('fs')
const path = require('path')

const fsOpts = { encoding: 'utf8', mode: 0o755, flag: 'w' }

const writeHtml = (html, dir, title) => {
  const filePath = path.join(dir, `${title}.html`)
  fs.writeFile(filePath, html, fsOpts, (err) => {
    if (err) {
      /* eslint-disable no-console */
      console.error(err)
      /* eslint-enable no-console */
    } else {
      /* eslint-disable no-console */
      console.log(`Wrote ${title} to ${filePath} successfully`)
      /* eslint-enable no-console */
    }
  })
}

const writeJs = (js, dir, title, metric) => {
  const filePath = path.join(dir, `${title}-${metric}.js`)
  fs.writeFile(filePath, js, fsOpts, (err) => {
    if (err) {
      /* eslint-disable no-console */
      console.error(err)
      /* eslint-enable no-console */
    } else {
      /* eslint-disable no-console */
      console.log(`Wrote ${title}-${metric} to ${filePath} successfully`)
      /* eslint-enable no-console */
    }
  })
}

module.exports = { writeHtml, writeJs }
