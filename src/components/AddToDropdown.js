import React from 'react'

export default class AddToDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDropdown: false
    }

    this.updateShowDropdown = this.updateShowDropdown.bind(this)
    this.bookIsInCategory = this.bookIsInCategory.bind(this)
  }

  updateShowDropdown() {
    this.setState((prevState) => {
      return {
        showDropdown: !prevState.showDropdown
      }
    })
  }

  bookIsInCategory(book, category) {
    return (category.findIndex((item) => item.title === book.title) > -1)
  }

  render() {
    const { showDropdown } = this.state
    const { book, updateReads, read, wantToRead, currentlyReading } = this.props
    return (
      <div className={showDropdown ? 'add-to-dropdown open' : 'add-to-dropdown'}>
        <button
          className='add-to-dropdown-button'
          onClick={this.updateShowDropdown}
          aria-label='Add book to reading list'
        ></button>
        <ul className='add-to-dropdown-items'>
          <li>
            <a
              className={this.bookIsInCategory(book, currentlyReading) ? 'in-list' : null}
              href='#'
              onClick={() => updateReads('currentlyReading', book, event)}
            >Currently Reading</a>
          </li>
          <li>
            <a
              className={this.bookIsInCategory(book, wantToRead) ? 'in-list' : null}
              href='#'
              onClick={() => updateReads('wantToRead', book, event)}
            >Want To Read</a>
          </li>
          <li>
            <a
              className={this.bookIsInCategory(book, read) ? 'in-list' : null}
              href='#'
              onClick={() => updateReads('read', book, event)}
            >Read</a>
          </li>
        </ul>
      </div>
    )
  }
}