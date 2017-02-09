'use strict'

const fs = require('fs')
const path = require('path')

const cssPath = path.join(__dirname, '../static/css')
const jsPath = path.join(__dirname, '../static/js')

const doctype = '<!DOCTYPE html>'
const html = '<html lang="en">'
const head = '<head>'
const charset = '<meta charset="utf-8" />'
const viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
const style = '<style type="text/css">'
const closeStyle = '</style>'
const script = '<script charset="utf-8" type="text/javascript">'
const closeScript = '</script>'
const closeHead = '</head>'
const closeHtml = '</html>'

const buildHead = (title) => {
  const opts = { encoding: 'utf8', flag: 'r' }

  const bassCssPath = path.join(cssPath, 'basscss.min.css')
  const bassCss = fs.readFileSync(bassCssPath, opts)

  const chartistCssPath = path.join(cssPath, 'chartist.min.css')
  const chartistCss = fs.readFileSync(chartistCssPath, opts)

  const chartistJsPath = path.join(jsPath, 'chartist.min.js')
  const chartistJs = fs.readFileSync(chartistJsPath, opts)

  const titleElem = `<title>${title}</title>`
  const styleElem = `${style}${bassCss}${chartistCss}${closeStyle}`
  const scriptElem = `${script}${chartistJs}${closeScript}`

  return `${doctype}${html}${head}${charset}${viewport}${titleElem}${styleElem}${scriptElem}${closeHead}`
}

const buildTail = () => {
  return closeHtml
}

module.exports = { buildHead, buildTail }
