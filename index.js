require('./api/server')

const { version, name } = require('./package.json')

console.log(`<<< ${name} v${version} was started in 'DEV' environment >>>`)
