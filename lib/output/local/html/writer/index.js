'use strict'

const fs = require('fs')
const path = require('path')

const fsOpts = { encoding: 'utf8', mode: 755, flag: 'w' }

const writeHtml = (html, path, title) => {
  const filePath = path.join(path, `${path}.html`)
  fs.writeFile(filePath, html, fsOpts, (err) => {
    if (err)  console.error(err)
    else      console.log(`Wrote ${title} to ${filePath} successfully`)
  })
}

module.exports = { writeHtml }
