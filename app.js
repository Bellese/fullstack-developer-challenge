// SERVER

const express = require('express')
const parser = require('body-parser')
const axios = require('axios');
const app = express()

const db = require('./database/index.js')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 8000;
const apiKey = process.env.API_KEY

app.use(express.static(__dirname + '/client/dist'));
app.use(parser.json());

app.get('/books/top', (req, res) => {
  let url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`
  axios.get(url)
    .then(response => res.end(JSON.stringify(response.data)))
    .catch(err => res.end(err))
})

app.get('/books/wishlist', (req, res) => {
  db.getWishlistBooks((err, response) => res.end(JSON.stringify(response)))
})

app.post('/books/wishlist', (req, res) => {
  db.addToWishlist(req.body.currentBook, (err) => res.end(err))
})

app.delete('/books/wishlist', (req, res) => {
  db.removeFromWishlist(req.body.currentBook, (err) => res.end(err))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})