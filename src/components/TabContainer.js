import React from 'react'
import FindBooks from './FindBooks'
import TabContent from './TabContent'

export default class TabContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { updateBooks, updateReads, categories, currentCategory, books, status, currentTab, updateCurrentTab, currentTabData } = this.props
    if (status === 'fetching') {
      return <h1>Fetching data</h1>
    }
    if (status === 'error') {
      return <h1>Error fetching data</h1>
    }
    return (
      <React.Fragment>
        <ul>
          <li onClick={() => updateCurrentTab('find')}>Find Books</li>
          <li onClick={() => updateCurrentTab('read')}>Read</li>
          <li onClick={() => updateCurrentTab('currentlyReading')}>Currently Reading</li>
          <li onClick={() => updateCurrentTab('wantToRead')}>Want To Read</li>
        </ul>
        {
          currentTab === 'find'
            ?
            <FindBooks
              updateBooks={updateBooks}
              updateReads={updateReads}
              categories={categories}
              currentCategory={currentCategory}
              books={books}
            />
            :
            <TabContent
              currentTabData={currentTabData}
            />
        }
      </React.Fragment>
    )
  }
}