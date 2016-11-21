const program = require('commander')
const version = require('./package.json').version
const winchester = require('./lib')

program
  .version(version)

program
  .command('fire [targetingInfo]')
  .description('Fire Winchester with the specified targeting information')
  .action((targetingInfo) => {
    const resultPromises = winchester.readyAimFire(__dirname, targetingInfo)

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
