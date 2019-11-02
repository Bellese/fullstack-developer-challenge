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
      showErrorPage: false,
      showModal: false,
    }
    this.getTopBooks = this.getTopBooks.bind(this)
    this.handleBookClick = this.handleBookClick.bind(this)
    this.handleHideModal = this.handleHideModal.bind(this)
    this.saveToWishlist = this.saveToWishlist.bind(this)
    this.deleteFromWishlist = this.deleteFromWishlist.bind(this)
  }

  componentDidMount() {
    this.getTopBooks()
  }

  getTopBooks(){
    axios.get('/books/top')
      .then((response) => {
        this.setState({ books: response.data.results.books})
      })
      .catch((err) => {
        console.log('An error occurred: ', err)
      })
  }

  handleBookClick(e) {
    let rank = e.currentTarget.dataset.id
    let book = this.state.books[rank-1]
    this.setState({showModal: true, currentBook: book});
  }

  handleHideModal() {
    this.setState({showModal: false})
  }

  saveToWishlist() {
    this.setState({
      wishlist : [this.state.currentBook, ...this.state.wishlist]
    })
  }

  deleteFromWishlist(e) {
    // let idx = e.currentTarget.dataset.id - 1
    // console.log(idx)
    // let newWishlist = this.state.wishlist.splice(idx, 1)
    // console.log(newWishlist)
    // this.setState({wishlist: newWishlist})
  }

  render() {
    let modal = this.state.showModal ? 
      <Modal>
          <SelectedBook handleHideModal={this.handleHideModal} 
                        currentBook={this.state.currentBook}
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
            <button className='right-align' onClick={()=>this.setState({showWishlist: !this.state.showWishlist})}>{navButton}</button>
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