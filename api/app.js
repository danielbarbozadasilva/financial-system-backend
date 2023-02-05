const express = require('express')
const app = express()
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('../docs/swagger.json')
const router = require('./routers/router')
require('express-async-errors')

app.use(express.json())
app.use(cors())
app.use('/static', express.static(`${__dirname}/..` + `/api/utils/file`))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

router(app)

module.exports = app
