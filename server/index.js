// SERVER

const express = require('express')
const parser = require('body-parser')
const app = express()

let port = 3000

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.listen(port, () => {
  console.log('listening on port ' +port)
})