import React from 'react'

export default class AddToDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDropdown: false
    }

    this.updateShowDropdown = this.updateShowDropdown.bind(this)
  }

  updateShowDropdown() {
    this.setState((prevState) => {
      return {
        showDropdown: !prevState.showDropdown
      }
    })
  }

  render() {
    const { showDropdown } = this.state
    const { book, updateReads } = this.props
    return (
      <React.Fragment>
        <button
          className='add-to-dropdown-button'
          onClick={this.updateShowDropdown}
        ></button>
        <ul className={showDropdown ? 'add-to-dropdown-items open' : 'add-to-dropdown-items'}>
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
      </React.Fragment>
    )
  }
}