import React from 'react'

const SelectedBook = ({currentBook, handleHideModal}) => (  
  <div className="modal">
      <div>
        Selected Book: {currentBook.title}
      </div>
      <button onClick={handleHideModal}>Hide modal</button>
  </div>
);

export default SelectedBook