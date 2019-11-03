
import React, { Component } from 'react';

class Books extends Component {

  render() {

    if (!this.props.books) {
      return (
        <div className="books">Wishlist empty!</div>
      )
    }


    return (
      <ul className="books" >
        {
          this.props.books.map((book, idx) => {
            return <li className="book_item" key={book.rank} data-idx={idx} data-rank={book.rank} onClick={this.props.handleBookClick}>
              <div>
                <img src={book.book_image} width="209" />
                <div className="book_description">
                  <h2>{book.title}</h2>
                  <section className="book_details">
                    <div className="book_author">
                      <span className="title"></span>
                      <span>{book.author}</span>
                    </div>
                    <div className="book_rank">
                      <span className="title">Rank: </span>
                      <span>{book.rank}</span>
                    </div>
                  </section>
                </div>
              </div></li>
          })
        }
      </ul>)
  }
}

export default Books