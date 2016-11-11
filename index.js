var program = require('commander')

program
  .version('1.0.0')
  .option('-t, --targeting-info', 'Specify targeting information')
  .option('-p, --parallel-fire', 'Specify if targets should be hit in parallel')
  .parse(process.argv)
  
