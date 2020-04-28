import React from 'react'
import ReactDOM from 'react-dom'
import Loading from './components/Loading'
import Nav from './components/Nav'
import Tabs from './components/Tabs'
import { ThemeProvider } from './contexts/theme'
import { fetchBooks, fetchCategories } from './utils/api'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles.css'

const FindBooks = React.lazy(() => import('./components/FindBooks'))
const TabContent = React.lazy(() => import('./components/TabContent'))
const BookInfo = React.lazy(() => import('./components/BookInfo'))

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
        { name: 'Currently Reading', value: 'currentlyReading' },
        { name: 'Want To Read', value: 'wantToRead' },
        { name: 'Read', value: 'read' }
      ],
      currentTab: 'find',
      // TODO: add light and dark mode to app.
      theme: 'light',
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === 'light' ? 'dark' : 'light'
        }))
      }
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
        if (categories.status === 'too-many-requests') {
          this.setState({
            status: 'too-many-requests'
          })
        } else {
          this.setState({
            categories,
            status: 'loaded',
            currentCategory: categories[0].list_name_encoded
          }, this.getBooks(categories[0].list_name_encoded))
        }

      })
      .catch((error) => {
        console.warn('Error fetching categories: ', error)
        this.setState({
          status: 'error'
        })
      })
  }

  updateReads(readType, book, e) {
    e.preventDefault()
    for (const read of this.state[readType]) {
      if (read.book_uri === book.book_uri) {
        alert('Book Already Exists in that Category')
        return
      }
    }
    this.setState((prevState) => ({
      [readType]: [
        ...prevState[readType],
        book
      ]
    }))
  }

  updateCurrentTab(tabValue) {
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
          if (booksData.status === 'too-many-requests') {
            this.setState({
              status: 'too-many-requests'
            })
          } else {
            this.setState(({ books }) => ({
              books: {
                ...books,
                [currentCategory]: booksData
              },
              currentCategory
            }))
          }
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
    if (this.state.status === 'fetching') {
      return <Loading />
    }
    if (this.state.status === 'too-many-requests') {
      return <h1>Too many requests. Please wait a few seconds and try again</h1>
    }
    if (this.state.status === 'error') {
      return <h1>Error fetching data</h1>
    }
    const { categories, currentCategory, books, currentTab, tabs, read, wantToRead, currentlyReading } = this.state
    const currentTabData = this.getTabData()
    return (
      <Router>
        <ThemeProvider value={{ 'theme': this.state.theme, 'toggleTheme': this.state.toggleTheme }}>
          <div className={`container ${this.state.theme}`}>
            <Nav />
            <Tabs
              tabs={tabs}
              currentTab={currentTab}
              updateCurrentTab={this.updateCurrentTab}
            />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route
                  exact path='/'
                  component={() => (
                    currentTab === 'find'
                      ?
                      <FindBooks
                        updateBooks={this.updateBooks}
                        updateReads={this.updateReads}
                        categories={categories}
                        currentCategory={currentCategory}
                        books={books}
                        read={read}
                        wantToRead={wantToRead}
                        currentlyReading={currentlyReading}
                      />
                      :
                      <TabContent
                        currentTabData={currentTabData}
                        updateReads={this.updateReads}
                        read={read}
                        wantToRead={wantToRead}
                        currentlyReading={currentlyReading}
                      />
                  )}
                />
                <Route path='/book-info' component={BookInfo} />
              </Switch>
            </React.Suspense>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)