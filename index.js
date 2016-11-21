const program = require('commander')
const version = require('./package.json').version
const winchester = require('./winchester')

program
  .version(version)

program
  .command('fire [targetingInfo]')
  .description('Fire Winchester with the specified targeting information')
  .action((targetingInfo) => {
    const results = winchester.readyAimFire(targetingInfo)

    Promise
    .all(resultPromises)
    .then((results) => {
      console.log(results)
    }, (error) => {
      console.error(error)
    })
  })

program
  .parse(process.argv)
