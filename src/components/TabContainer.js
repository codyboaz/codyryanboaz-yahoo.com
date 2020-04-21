import React from 'react'
import FindBooks from './FindBooks'
import TabContent from './TabContent'
import MyReads from '../images/my-reads.svg'

export default class TabContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { updateBooks, updateReads, categories, currentCategory, books, status, tabs, currentTab, updateCurrentTab, currentTabData } = this.props
    if (status === 'fetching') {
      return <h1>Fetching data</h1>
    }
    if (status === 'error') {
      return <h1>Error fetching data</h1>
    }
    return (
      <React.Fragment>
        <nav className='main-nav'>
          <ul className='main-nav-items'>
            <li className='main-nav-logo-container'><img className='main-nav-logo' src={MyReads} alt='My Reads Logo' /></li>
            {tabs.map((tab) => (
              <li key={tab.value}>
                <a
                  href='#'
                  className={tab.value === currentTab ? 'main-nav-tab-items active' : 'main-nav-tab-items'}
                  onClick={() => updateCurrentTab(tab.value)}
                >{tab.name}</a>
              </li>
            ))}
          </ul>
        </nav>

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