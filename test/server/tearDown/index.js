const execSync = require('child_process').execSync
const processes = execSync('ps | grep "node test/server/setUp"').toString().trim().split(/\n/).filter(p => !p.includes('grep')).filter(p => !p.includes('sh -c'))

for(var i = 0; i < processes.length; i++) {
  const processElements = processes[i].trim().split(' ')
  const pid = parseInt(processElements[0])
  execSync(`kill ${pid}`)
}
