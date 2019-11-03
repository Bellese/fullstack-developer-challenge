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
  database: process.env.RDS_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// connection.end();

const getWishlistBooks = (cb) => {
  let query = `SELECT * FROM wishlist`;
  connection.query(query, (err, results) => {
    cb(err, results);
  })
}

const addToWishlist = ({ title, book_image, amazon_product_url, author, rank, description, primary_isbn10 }, cb) => {
  var query = `INSERT INTO wishlist (title, book_image, amazon_product_url, author, rank, description, primary_isbn10) VALUE (?, ?, ?, ?, ?, ?, ?);`;
  connection.query(query, [title, book_image, amazon_product_url, author, rank, description, primary_isbn10], (err, results) => {
    console.log(err)
    //err.code === 'ER_DUP_ENTRY'
    cb(err);
  });
}

const removeFromWishlist = ({primary_isbn10}, cb) => {
  var query = `DELETE FROM wishlist WHERE primary_isbn10 = ?;`;
  connection.query(query, [primary_isbn10], (err) => {
    cb(err);
  });
}

// exports.connection = connection;
exports.getWishlistBooks = getWishlistBooks;
exports.addToWishlist = addToWishlist;
exports.removeFromWishlist = removeFromWishlist;
