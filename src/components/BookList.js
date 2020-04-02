import React from 'react'
import { fetchBooks, fetchCategories } from '../utils/api'
import { Link } from 'react-router-dom'

export default class BookList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: null,
      books: null,
      status: 'fetching'
    }

    this.getBooks = this.getBooks.bind(this)
    this.updateBooks = this.updateBooks.bind(this)
    this.getCategories = this.getCategories.bind(this)
  }
  componentDidMount() {
    this.getCategories()
  }

  getCategories() {
    fetchCategories()
      .then((categories) => {
        this.setState({
          categories,
          status: 'loaded'
        }, this.getBooks(categories[0].list_name_encoded))
      })
      .catch((error) => {
        console.warn('Error fetching categories: ', error)
        this.setState({
          status: 'error'
        })
      })
  }

  getBooks(category) {
    fetchBooks(category)
      .then((books) => {
        this.setState({
          books
        })
      })
  }

  updateBooks(e) {
    console.log('here', e.target.value)
    this.getBooks(e.target.value)
  }

  render() {
    if (this.state.status === 'error') {
      return <h1>Error fetching data</h1>
    }
    return (
      <React.Fragment>
        <select name='book-categories' disabled={this.state.categories ? null : true} onChange={this.updateBooks}>
          {this.state.categories
            ?
            this.state.categories.map((category) => (
              <option key={category.list_name_encoded} value={category.list_name_encoded}>{category.list_name}</option>
            ))
            :
            <option>Loading Categories</option>
          }
        </select>
        {this.state.books
          ?
          <ul className='book-list'>
            {this.state.books.map((book) => (
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