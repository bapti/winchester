const program = require('commander')
const version = require('./package.json').version
const winchester = require('./lib')

program
  .version(version)

program
  .command('fire [timesToFire] [targetingInfo]')
  .description('Fire Winchester the specified number of times using the specified targeting information')
  .action((timesToFire, targetingInfo) => {
    const { targets, output } = winchester.aim(__dirname, targetingInfo)
    winchester.fire(timesToFire, targets, output, __dirname)
  })

program
  .parse(process.argv)
