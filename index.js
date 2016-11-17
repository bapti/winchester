const program = require('commander')
const version = require('./package.json').version
const winchester = require('./winchester')

program
  .version(version)

program
  .command('fire [targetingInfo]')
  .description('Fire Winchester with the specified targeting information')
  .action((targetingInfo) => {
    console.error(targetingInfo)
    winchester.readyAimFire(targetingInfo)
  })

program
  .parse(process.argv)
