import React, {Fragment} from 'react'

const SelectedBook = ({currentBook, handleHideModal}) => (  
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
          Get the book: {currentBook.amazon_product_url} <br/>
        </div>
      </section>
    </div>
    <button onClick={handleHideModal}>Hide modal</button>
    </div>
  </div>
);

export default SelectedBook