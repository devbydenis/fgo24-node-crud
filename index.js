require("dotenv").config();

const express = require('express')
const {constants: http} = require('http2')

const app = express()

app.use(express.urlencoded())
app.use(express.json())

app.use('/', require('./src/routers'))

app.get('/*splat', (_req, res) => {
  return res.status(http.HTTP_STATUS_NOT_FOUND).json({
    success: false,
    message: 'Not Found'
  })
})

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})