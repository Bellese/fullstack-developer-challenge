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
      showWishList: false,
      books: [],
      currentBook: {},
      showErrorPage: false,
      showModal: false,
    }
    this.getTopBooks = this.getTopBooks.bind(this)
    this.handleBookClick = this.handleBookClick.bind(this)
    this.handleHideModal = this.handleHideModal.bind(this)
    // this.saveToWishList = this.saveToWishList.bind(this)
    // this.deleteFromWishList = this.deleteFromWishList.bind(this)
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
    console.log(book)
    this.setState({showModal: true, currentBook: book});
  }

  handleHideModal() {
    this.setState({showModal: false})
  }

  render() {
    let modal = this.state.showModal ? 
      <Modal>
        <div className="modal">
         <div className="preview">
          <SelectedBook handleHideModal={this.handleHideModal} currentBook={this.state.currentBook}/>
          </div>
        </div>
      </Modal>
      : <Fragment />

    return (
      <Fragment>
        <Books books={this.state.showWishlist ? this.state.wishlist : this.state.books} 
                showWishList={this.state.showWishList} 
                handleBookClick={this.handleBookClick}
        />
        {modal}
      </Fragment>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))