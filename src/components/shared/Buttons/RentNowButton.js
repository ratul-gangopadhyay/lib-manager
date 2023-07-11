import React from 'react';
import './Button.css';

const RentNowButton = ({ user, item, runOnClick, booksRented }) => {
  const alreadyRented = (booksRented, bookId) => booksRented.includes(bookId);

  return (
    <>
      <button
        onClick={() => runOnClick(item)}
        className='rent-btn'
        disabled={!user || alreadyRented(booksRented, item.id) || !item.copies}
      >
        Rent Now
      </button>
    </>
  );
};

export default RentNowButton;
