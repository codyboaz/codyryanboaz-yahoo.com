import React from 'react'
import { Link } from 'react-router-dom'
import AddToDropdown from './AddToDropdown'

export default function BookList({ books, currentCategory, updateReads, read, wantToRead, currentlyReading }) {
  const bookData = currentCategory ? books[currentCategory] : books
  return (
    <div className='book-list-container'>
      {bookData.length
        ?
        <ul className='book-list'>
          {bookData.map((book) => (
            <li key={book.book_uri} className='book-info'>
              <Link to={{ pathname: '/book-info', state: { isbns: book.isbns } }}>
                <img src={book.book_image} alt={book.title} />
              </Link>
              <h3>{book.title}</h3>
              <AddToDropdown
                book={book}
                updateReads={updateReads}
                read={read}
                wantToRead={wantToRead}
                currentlyReading={currentlyReading}
              />
            </li>
          ))}
        </ul>
        :
        <h3>No books found</h3>
      }
    </div>
  )
}