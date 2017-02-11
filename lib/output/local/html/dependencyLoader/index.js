'use strict'

const fs = require('fs')
const path = require('path')

const fsOpts = { encoding: 'utf8', flag: 'r' }

const staticPath = path.join(__dirname, './static')

const cssPath = path.join(staticPath, './css')
const jsPath = path.join(staticPath, './js')
const jsPluginsPath = path.join(jsPath, './plugins')

const bassCssPath = path.join(cssPath, './basscss.min.css')
const chartistCssPath = path.join(cssPath, './chartist.min.css')

const chartistJsPath = path.join(jsPath, './chartist.min.js')
const axisTitlesPath = path.join(jsPluginsPath, './chartist-plugin-axistitle.min.js')
const pointLabelsPath = path.join(jsPluginsPath, './chartist-plugin-pointlabels.min.js')

const load = () => {
  const bassCss = fs.readFileSync(bassCssPath, fsOpts)
  const chartistCss = fs.readFileSync(chartistCssPath, fsOpts)

  const chartistJs = fs.readFileSync(chartistJsPath, fsOpts)
  const axisTitlesJs = fs.readFileSync(axisTitlesPath, fsOpts)
  const pointLabelsJs = fs.readFileSync(pointLabelsPath, fsOpts)

  return {
    bassCss: bassCss,
    chartistCss: chartistCss,
    chartistJs: chartistJs,
    axisTitlesJs: axisTitlesJs,
    pointLabelsJs: pointLabelsJs
  }
}

module.exports = { load }
