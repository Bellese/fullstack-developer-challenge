// CLIENT

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Books from './components/books.jsx'
import Modal from './components/modal.jsx'
import SelectedBook from './components/selectedBook.jsx'

const errorMessage = "Oh no! An error occurred. Please try again later."

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showWishlist: false,
      wishlist: [],
      books: [],
      currentBook: {},
      showError: false,
      showModal: false,
      showMsg: false,
    }
    this.getTopBooks = this.getTopBooks.bind(this)
    this.handleBookClick = this.handleBookClick.bind(this)
    this.handleHideModal = this.handleHideModal.bind(this)
    this.addToWishlist = this.addToWishlist.bind(this)
    this.getWishlistBooks = this.getWishlistBooks.bind(this)
    this.deleteFromWishlist = this.deleteFromWishlist.bind(this)
    this.hideBannerAfterDelay = this.hideBannerAfterDelay.bind(this)
  }

  componentDidMount() {
    this.getTopBooks()
    this.getWishlistBooks()
  }

  getTopBooks() {
    axios.get('/books/top')
      .then(({ data }) => this.setState({ books: data.results.books }))
      .catch((err) => console.log('An error occurred: ', err))
  }

  getWishlistBooks() {
    axios.get('/books/wishlist')
      .then(({ data }) => this.setState({ wishlist: data }))
      .catch((err) => console.err('An error occurred:', err))
  }

  handleBookClick(e) {
    let rank = e.currentTarget.dataset.rank
    let book = this.state.books[rank - 1]
    this.setState({ showModal: true, currentBook: book })
  }

  handleHideModal() {
    this.setState({ showModal: false })
  }

  addToWishlist() {
    axios.post('/books/wishlist', { currentBook: this.state.currentBook })
      .then((response) => {
        let message = "Good choice! Successfully added to your wishlist :)"

        if (response && response.data) {
          if (response.data === 'ER_DUP_ENTRY') message = "This title is already in your wishlist!"
          else message = errorMessage
        }

        this.setState({ showMsg: message }, () => {
          this.hideBannerAfterDelay()
          this.getWishlistBooks()
        })
      })
      .catch((err) => console.err('An error occurred:', err))
  }

  deleteFromWishlist() {
    let { currentBook } = this.state
    axios.delete('/books/wishlist', { data: { currentBook, } })
      .then((response) => {
        let message = "Successfully deleted from your wishlist.";
        if (response.data) message = errorMessage
        this.setState({ showMsg: message }, () => {
          this.hideBannerAfterDelay()
          this.getWishlistBooks()
        })
      })
  }

  hideBannerAfterDelay(delay = 2000) {
    let self = this;
    setTimeout(() => {
      self.setState({ showMsg: false })
    }, delay)
  }


  render() {
    let modal = this.state.showModal ?
      <Modal>
        <SelectedBook handleHideModal={this.handleHideModal}
          currentBook={this.state.currentBook}
          showMsg={this.state.showMsg}
          showWishlist={this.state.showWishlist}
          addToWishlist={this.addToWishlist}
          deleteFromWishlist={this.deleteFromWishlist}
        />
      </Modal>
      : <Fragment />

    let navButton = this.state.showWishlist ? "See NYT best sellers" : "See your wishlist";
    return (
      <Fragment>
        <div className="header">
          <h3>Okay Reads</h3>
          <h5>A barely okay clone of Good Reads. Click on a book to learn more about that NYT bestseller.
            <button className='right-align' onClick={() => this.setState({ showWishlist: !this.state.showWishlist })}>{navButton}</button>
          </h5>
        </div>
        <Books books={this.state.showWishlist ? this.state.wishlist : this.state.books}
          showWishlist={this.state.showWishlist}
          handleBookClick={this.handleBookClick}
        />
        {modal}
      </Fragment>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))