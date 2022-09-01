const { version, name } = require('../package.json')
const app = require('./app')

const port = process.env.PORT ? Number(process.env.PORT) : 3001

console.log(`<<< ${name} v${version} was started in 'DEV' environment >>>`)

app.listen(port, () => {})
