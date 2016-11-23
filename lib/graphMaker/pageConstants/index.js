const pagePrefix = `
<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load('current', { 'packages': [ 'corechart' ] });
      google.charts.setOnLoadCallback(drawChart);
`

const pageSuffix = `
    </script>
  </head>
  <body>
    <div id="chart" style="width:900px;height:500px"></div>
  </body>
</html>
`

function chartOptions(title) {
  return `
    {
      title: '${title}',
      curveType: 'function',
      legend: {
        position: 'bottom'
      }
    }
  `
}

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
        var chart = new google.visualization.LineChart(document.getElementById('chart'));
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
