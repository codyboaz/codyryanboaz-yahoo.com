import React from 'react'
import { Link } from 'react-router-dom'

export default function BookList({ books, currentCategory, updateReads }) {
  const bookData = currentCategory ? books[currentCategory] : books
  return (
    <div className='book-list-container'>
      {bookData
        ?
        <ul className='book-list'>
          {bookData.map((book) => (
            <li key={book.book_uri} className='book-info'>
              <Link to={{ pathname: '/book-info', state: { isbns: book.isbns } }}>
                <p>{book.title}</p>
                <img src={book.book_image} alt={book.title} />
              </Link>
              <div className='add-to-dropdown'>
                <button>+</button>
                <ul>
                  <li>
                    <a
                      href='#'
                      onClick={() => updateReads('currentlyReading', book, event)}
                    >Currently Reading</a>
                  </li>
                  <li>
                    <a
                      href='#'
                      onClick={() => updateReads('wantToRead', book, event)}
                    >Want To Read</a>
                  </li>
                  <li>
                    <a
                      href='#'
                      onClick={() => updateReads('read', book, event)}
                    >Read</a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
        :
        <h3>No books found</h3>
      }
    </div>
  )
}