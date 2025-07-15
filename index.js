const express = require('express')
const {constants: http} = require('http2')

const app = express()

app.use(express.urlencoded())
app.use(express.json())


app.get('/*splat', (_req, res) => {
  return res.status(http.HTTP_STATUS_NOT_FOUND).json({
    success: false,
    message: 'Not Found'
  })
})

app.listen(8008, () => {
  console.log('Server running on port 8008')
})