require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const app = express()
const { formatError } = require('./utils/errors/errors.handler')
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

app.use((err, req, res, next) => {
  formatError(err, res)
})

module.exports = app
