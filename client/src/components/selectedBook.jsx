import React, { Fragment } from 'react'

const SelectedBook = ({ currentBook, handleHideModal, showWishlist, showMsg, addToWishlist, deleteFromWishlist }) => (
  <div className="modal">
    <div className="preview">
      <div className="book_description">
        <h2>{currentBook.title} <span id="modal-x" onClick={handleHideModal}>X</span></h2>
        <section className="book_details">
          {/* div 1 */}
          <div className="modal-left">
            <img src={currentBook.book_image} width="209" />
          </div>
          {/* div 2 */}
          <div className="modal-right">
            <div>
              <span>Author: {currentBook.author}</span>
            </div>
            <div>
              <span>Rank: {currentBook.rank}</span>
            </div><br />
            <div>
              <span>{currentBook.description}</span>
            </div><br />
            <div>
              <button onClick={() => window.open(currentBook.amazon_product_url, "_blank")}>Get the book</button><br /><br />
              {showWishlist ? <button onClick={() => handleOnClick(deleteFromWishlist)}>Remove from Wishlist</button>
                : <button onClick={() => handleOnClick(addToWishlist)}>Add to Wishlist</button>
              }<br /><br />
              <div><span>{showMsg}</span></div>
            </div>
          </div>
        </section>
        <div>
          <button className="close-btn" onClick={handleHideModal}>Return to books</button>
        </div>
      </div>
    </div>
  </div>
);

const handleOnClick = function (method) {
  method()

}

export default SelectedBook