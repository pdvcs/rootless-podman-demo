'use strict'

const express = require('express')
const app = express()
const sPort = process.env.APP_PORT || '3000'
const port = parseInt(sPort)

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`[${new Date().toISOString()}] Hello World!`)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
