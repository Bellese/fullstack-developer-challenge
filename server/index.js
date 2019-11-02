// SERVER

const express = require('express')
const parser = require('body-parser')
const mysql = require('mysql');
const axios = require('axios');
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
});

connection.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

connection.end();

const port = process.env.PORT;
const apiKey = process.env.API_KEY

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.get('/books/top', (req, res) => {
  let url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`
  axios.get(url)
    .then(response => {
      res.end(JSON.stringify(response.data))
    })
    .catch(err => {
      res.end(err)
    })
})



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})