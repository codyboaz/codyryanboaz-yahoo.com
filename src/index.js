import React from 'react'
import ReactDOM from 'react-dom'
import BookList from './components/BookList'
import BookInfo from './components/BookInfo'
import { fetchBooks, fetchCategories } from './utils/api'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: null,
      currentCategory: null,
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
          status: 'loaded',
          currentCategory: categories[0].list_name_encoded
        }, this.getBooks(categories[0].list_name_encoded))
      })
      .catch((error) => {
        console.warn('Error fetching categories: ', error)
        this.setState({
          status: 'error'
        })
      })
  }

  getBooks(currentCategory) {
    if (this.state.books && this.state.books[currentCategory]) {
      this.setState({
        currentCategory
      })
    } else {
      fetchBooks(currentCategory)
        .then((booksData) => {
          this.setState(({ books }) => {
            return {
              books: {
                ...books,
                [currentCategory]: booksData
              },
              currentCategory
            }
          })
        })
    }
  }

  updateBooks(e) {
    this.getBooks(e.target.value)
  }

  render() {
    const { categories, currentCategory, books, status } = this.state
    return (
      <div className='container'>
        <Router>
          <Route
            exact path='/'
            component={() => (
              <BookList
                updateBooks={this.updateBooks}
                categories={categories}
                currentCategory={currentCategory}
                books={books}
                status={status}
              />
            )}
          />
          <Route path='/book-info' component={BookInfo} />
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)