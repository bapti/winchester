

function stringifyData(data) {
  var rows = `[ `
  for(var r = 0; r < data.length; r++) {
    var row = '['
    for(var c = 0; c < data[r].length; c++) {
      if(typeof data[r][c] === 'string') row = `${row} '${data[r][c]}', `
      if(typeof data[r][c] === 'number') row = `${row} ${data[r][c]}, `
      if(c === data[r].length - 1) row = row.slice(0, -2)
    }
    row = r === data.length -1 ? `${row} ]` : `${row} ], `
    rows = `${rows}${row}`
  }

  return `${rows} ]`
}

function drawChart(data, options) {
  return `
      function drawChart() {
        var data = google.visualization.arrayToDataTable(${stringifyData(data)});
        var options = ${options};
        var chart = new google.charts.Line(document.getElementById('chart'));
        chart.draw(data, options);
      }
  `
}

const pageConstants = {
  pagePrefix: pagePrefix,
  pageSuffix: pageSuffix,
  chartOptions: chartOptions,
  drawChart: drawChart
}

module.exports = pageConstants
