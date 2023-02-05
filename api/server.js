const { version, name } = require('../package.json')
const app = require('./app')

const port = process.env.PORT || 3001

app.listen(port, () =>
  console.log(
    `<<< ${name} v${version} was started in 'DEV' environment on port ${port}>>>`
  )
)
