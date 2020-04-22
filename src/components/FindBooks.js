import React from 'react'
import BookList from './BookList'

export default class FindBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: ''
    }

    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e) {
    this.setState({
      searchValue: e.target.value
    })
  }

  searchBookList(books) {
    return books.filter((book) => {
      return book.title.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1
    })
  }

  render() {
    const { updateBooks, updateReads, categories, currentCategory, books } = this.props
    const bookList = this.state.searchValue ? { [currentCategory]: this.searchBookList(books[currentCategory]) } : books
    return (
      <React.Fragment>
        <div className='find-books'>
          <select
            className='find-books-categories'
            value={currentCategory}
            disabled={categories ? null : true}
            onChange={updateBooks}
          >
            {categories
              ?
              categories.map((category) => (
                <option
                  key={category.list_name_encoded}
                  value={category.list_name_encoded}
                >{category.list_name}</option>
              ))
              :
              <option>Loading Categories</option>
            }
          </select>
          <label className='find-books-search-label'>
            Search By Title:
            <input
              className='find-books-search'
              type='text'
              value={this.state.searchValue}
              onChange={this.handleInput}
            />
          </label>
        </div>

        {books && (
          <BookList
            books={bookList}
            currentCategory={currentCategory}
            updateReads={updateReads}
          />
        )}
      </React.Fragment>
    )
  }
}