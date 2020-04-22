import React from 'react'
import BookList from './BookList'

export default class TabContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { currentTabData, updateReads } = this.props
    return (
      <React.Fragment>
        {currentTabData.length
          ?
          <BookList
            books={currentTabData}
            updateReads={updateReads}
          />
          :
          <h2>No Books added yet</h2>
        }
      </React.Fragment>
    )
  }
}