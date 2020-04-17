import React from 'react'
import ReactDOM from 'react-dom'
import TabContainer from './components/TabContainer'
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
      status: 'fetching',
      read: [],
      wantToRead: [],
      currentlyReading: [],
      tabs: [
        { name: 'Find Books', value: 'find' },
        { name: 'Read', value: 'read' },
        { name: 'Currently Reading', value: 'currentlyReading' },
        { name: 'Want To Read', value: 'wantToRead' }
      ],
      currentTab: 'find'
    }

    this.getBooks = this.getBooks.bind(this)
    this.updateBooks = this.updateBooks.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.updateReads = this.updateReads.bind(this)
    this.updateCurrentTab = this.updateCurrentTab.bind(this)
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

  updateReads(readType, book) {
    for (const read of this.state[readType]) {
      if (read.book_uri === book.book_uri) {
        alert('Book Already Exists in that Category')
        return
      }
    }
    this.setState((prevState) => {
      return {
        [readType]: [
          ...prevState[readType],
          book
        ]
      }
    })
  }

  updateCurrentTab(tabValue) {
    console.log(tabValue)
    this.setState({
      currentTab: tabValue
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

  getTabData() {
    const currentTab = this.state.currentTab
    if (currentTab === 'read') {
      return this.state.read
    } else if (currentTab === 'currentlyReading') {
      return this.state.currentlyReading
    } else if (currentTab === 'wantToRead') {
      return this.state.wantToRead
    }
  }

  render() {
    const { categories, currentCategory, books, status, currentTab, read, wantToRead, currentlyReading } = this.state
    const currentTabData = this.getTabData()

    return (
      <div className='container'>
        <Router>
          <Route
            exact path='/'
            component={() => (
              <TabContainer
                updateBooks={this.updateBooks}
                updateReads={this.updateReads}
                updateCurrentTab={this.updateCurrentTab}
                read={read}
                wantToRead={wantToRead}
                currentlyReading={currentlyReading}
                categories={categories}
                currentCategory={currentCategory}
                books={books}
                status={status}
                currentTab={currentTab}
                currentTabData={currentTabData}
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