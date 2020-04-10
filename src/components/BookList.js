import React from 'react'
import { Link } from 'react-router-dom'

export default class BookList extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { updateBooks, categories, currentCategory, books, status } = this.props
    if (status === 'error') {
      return <h1>Error fetching data</h1>
    }
    return (
      <React.Fragment>
        <select name='book-categories' disabled={categories ? null : true} onChange={updateBooks}>
          {categories
            ?
            categories.map((category) => (
              <option
                key={category.list_name_encoded}
                value={category.list_name_encoded}
                selected={category.list_name_encoded === currentCategory ? true : null}
              >{category.list_name}</option>
            ))
            :
            <option>Loading Categories</option>
          }
        </select>
        {books
          ?
          <ul className='book-list'>
            {books[currentCategory].map((book) => (
              <li key={book.book_uri} className='book-info'>
                <Link to={{ pathname: '/book-info', state: { isbns: book.isbns } }}>
                  <p>{book.title}</p>
                  <img src={book.book_image} alt={book.title} />
                </Link>
              </li>
            ))}
          </ul>
          :
          <div>Retrieving book data...</div>
        }
      </React.Fragment>
    )
  }
}