// DATABASE

const mysql = require('mysql');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
});

const getWishlistBooks = (cb) => {
  let query = `SELECT * FROM wishlist`;
  connection.query(query, (err, results) => {
    callback(err, results);
  })
}

const addToWishlist = ({ title, rank, author, description }, cb) => {
  var query = `INSERT INTO wishlist (title, rank, author, description) VALUE (?, ?, ?, ?);`;
  connection.query(query, [title, rank, author, description], (err, results) => {
    err ? console.error(err) : callback(err, results);
  });
}

exports.connection = connection;
exports.getWishlistBooks = getWishlistBooks;
