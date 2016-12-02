'use strict'

const page = {
  head: `<html>`,
  tail: `</html>`
}

const head = {
  head: `<head><link href="https://unpkg.com/basscss@7.1.1/css/basscss.min.css" rel="stylesheet" />`,
  tail: `</head>`
}

const script = {
  head: `<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script><script type="text/javascript">google.charts.load('current',{'packages':['line']});google.charts.setOnLoadCallback(drawChart);`,
  tail: `</script>`
}

const body = {
  head: `<body>`,
  tail: `<div id="chart" style="width:900px;height:500px"></div></body>`
}

function makeScript(graphFn) {
  return `${script.head}${graphFn}${script.tail}`
}

function makeTitle(title) {
  return `<title>${title}</title>`
}

function makeHead(title, graphFn) {
  return `${head.head}${makeScript(graphFn)}${makeTitle(title)}${head.tail}`
}

function makeHeader(title) {
  return `<h1>${title}</h1>`
}

function makeBody(title) {
  return `${body.head}${makeHeader(title)}${body.tail}`
}

function makePage(title, graphFn) {
  return `${page.head}${makeHead(title, graphFn)}${makeBody(title)}${page.tail}`
}

const pageMaker = {
  makePage: makePage
}

module.exports = pageMaker
