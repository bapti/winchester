'use strict'

const { buildHead, buildTail } = require('../common')

const buildIndex = (title) => {
  const head = buildHead(title)

  const container = '<div class="overflow-scroll">'
  const header = `<h1 class="center">${title}</h1>`
  const table = '<table class="table-light">'

  const headings = [ 'Response Time', 'Throughput', 'Latency', 'Timeouts', 'Errors' ]
  const tableHeadings = headings.map(h => `<th>${h}</th>`).reduce((a, c) => a + c, '')
  const tableHead = `<thead class="bg-darken-1"><tr>${tableHeadings}</tr></thead>`

  const cells = [ 'responseTime', 'throughput', 'latency', 'timeouts', 'errors' ]
  const tableCells = cells.map(c => `<td>${c}</td>`).reduce((a, c) => a + c, '')
  const tableBody = `<tbody><tr>${tableCells}</tr></tbody>`

  const closeTable = '</table>'
  const closeContainer = '</div>'

  const body = `${container}${header}${table}${tableHead}${tableBody}${closeTable}${closeContainer}`

  const tail = buildTail()

  return `${head}${body}${tail}`
}

module.exports = { buildIndex }
