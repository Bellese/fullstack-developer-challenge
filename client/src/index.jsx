// CLIENT

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Books from './components/books.jsx'
import Modal from './components/modal.jsx'
import SelectedBook from './components/selectedBook.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showWishlist: false,
      wishlist: [],
      books: [],
      currentBook: {},
      currentIdx: 0,
      showError: false,
      showModal: false,
      showMsg: false,
    }
    this.getTopBooks = this.getTopBooks.bind(this)
    this.handleBookClick = this.handleBookClick.bind(this)
    this.handleHideModal = this.handleHideModal.bind(this)
    this.saveToWishlist = this.saveToWishlist.bind(this)
    this.deleteFromWishlist = this.deleteFromWishlist.bind(this)
    this.hideBannerAfterDelay = this.hideBannerAfterDelay.bind(this)
  }

  componentDidMount() {
    this.getTopBooks()
  }

  getTopBooks() {
    axios.get('/books/top')
      .then((response) => {
        this.setState({ books: response.data.results.books })
      })
      .catch((err) => {
        console.log('An error occurred: ', err)
      })
  }

  handleBookClick(e) {
    let rank = e.currentTarget.dataset.rank
    let idx = e.currentTarget.dataset.idx
    let book = this.state.books[rank - 1]
    this.setState({ showModal: true, currentBook: book, currentIdx: idx })
  }

  handleHideModal() {
    this.setState({ showModal: false })
  }

  saveToWishlist() {
    this.setState({
      wishlist: [this.state.currentBook, ...this.state.wishlist],
      showMsg: true,
    }, this.hideBannerAfterDelay)
  }

  deleteFromWishlist() {
    let { wishlist, currentIdx } = this.state
    let newWishlist = wishlist.slice()
    newWishlist.splice(currentIdx, 1)
    this.setState({ wishlist: newWishlist })
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
          saveToWishlist={this.saveToWishlist}
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