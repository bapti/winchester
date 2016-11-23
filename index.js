const program = require('commander')
const version = require('./package.json').version
const winchester = require('./lib')

program
  .version(version)

program
  .command('fire [targetingInfo]')
  .description('Fire Winchester with the specified targeting information')
  .action((targetingInfo) => {
    const targets = winchester.aim(__dirname, targetingInfo)
    winchester.fire(targets)
  })

program
  .parse(process.argv)
