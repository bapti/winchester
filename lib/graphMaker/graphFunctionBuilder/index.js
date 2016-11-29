function makeRows(data) {
  return data.slice(1).reduce((acc, row, index, rows) => {
    var rowStr = `[${row.reduce((acc, datum) => `${acc},${datum}`)}]`
    return index === rows.length ? rowStr : `${rowStr},`
  }, '')
}

function makeColumnHeaders(data) {
  return data[0].reduce((acc, title) => {
    return `${acc}data.addColumn('number', '${title}');`
  }, '')
}

function drawBarChart(data, options) {
  return `
    function drawChart() {
      var data = new google.visualization.DataTable();
      ${makeColumnHeaders(data)}
      data.addRows([${makeRows(data)}]);
      var options = ${options};
      var chart = new google.charts.Bar(document.getElementById('chart'));
      chart.draw(data, options);
    }
  `
}

function drawLineChart(data, options) {
  return `
    function drawChart() {
      var data = new google.visualization.DataTable();
      ${makeColumnHeaders(data)}
      data.addRows([${makeRows(data)}]);
      var options = ${options};
      var chart = new google.charts.Line(document.getElementById('chart'));
      chart.draw(data, options);
    }
  `
}

const graphFunctionBuilder = {
  drawBarChart: drawBarChart,
  drawLineChart: drawLineChart
}

module.exports = graphFunctionBuilder
