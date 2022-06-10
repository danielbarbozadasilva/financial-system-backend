const express = require('express')
const app = express()
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')

app.use(express.json())
app.use(cors())
app.use('/static', express.static(__dirname + '/..' + '/api/utils/file'))

router(app)

const port = process.env.PORT ? Number(process.env.PORT) : 3001

app.listen(port, () => {})

module.exports = app
