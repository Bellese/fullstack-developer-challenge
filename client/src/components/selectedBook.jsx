import React, {Fragment} from 'react'

const SelectedBook = ({currentBook, handleHideModal, showWishlist, showMsg, saveToWishlist, deleteFromWishlist}) => (  
  <div className="modal">
    <div className="preview">
    <div className="book_description">
      <h2>{currentBook.title}</h2>
      <section className="book_details">
        {/* div 1 */}
        <div> 
          <img src={currentBook.book_image} width="209"/>
        </div>
        {/* div 2 */}
        <div>
          <div className="book_author">
              <span>{currentBook.author}</span>
            </div>
            <div className="book_rank"> 
              <span className="title">Rank: </span>
              <span>{currentBook.rank}</span>
            </div>
            <span className="title"></span>
          {currentBook.description}<br/>
          <div>
            <button onClick={() => window.open(currentBook.amazon_product_url, "_blank")}>Get the book</button>
            {showWishlist ? <button onClick={()=>handleOnClick(deleteFromWishlist)}>Remove from Wishlist</button>
                          : <button onClick={()=>handleOnClick(saveToWishlist)}>Add to Wishlist</button>
            }
            <div>{showMsg ? "Success!" : ""}</div>
          </div>
        </div>
      </section>
    </div>
    <button onClick={handleHideModal}>Hide modal</button>
    </div>
  </div>
);

const handleOnClick = function(method) {
  method()

}

export default SelectedBook