const program = require('commander')

program
  .version('1.0.0')
  .option('-t, --targeting-info', 'Specify targeting information')
  .parse(process.argv)
