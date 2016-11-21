const program = require('commander')
const version = require('./package.json').version
const winchester = require('./lib')

program
  .version(version)

program
  .command('fire [targetingInfo]')
  .description('Fire Winchester with the specified targeting information')
  .action((targetingInfo) => {
    const resultPromiseArrays = winchester.readyAimFire(__dirname, targetingInfo)

    for(var i = 0; i < resultPromiseArrays.length; i++) {
      Promise
      .all(resultPromiseArrays[i])
      .then((results) => {
        console.log(results)
      }, (error) => {
        console.error(error)
      })
    }
  })

program
  .parse(process.argv)
