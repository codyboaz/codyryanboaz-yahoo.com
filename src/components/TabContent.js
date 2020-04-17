import React from 'react'
import { Link } from 'react-router-dom'

export default class TabContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { currentTabData } = this.props
    return (
      <React.Fragment>
        {currentTabData.length
          ?
          <ul>
            {currentTabData.map((tabData) => (
              <li key={tabData.book_uri} className='book-info'>
                <Link to={{ pathname: '/book-info', state: { isbns: tabData.isbns } }}>
                  <p>{tabData.title}</p>
                  <img src={tabData.book_image} alt={tabData.title} />
                </Link>
                <div className='add-to-dropdown'>
                  <button>+</button>
                  <ul>
                    <li onClick={() => updateReads('read', tabData)}>Read</li>
                    <li onClick={() => updateReads('wantToRead', tabData)}>Want To Read</li>
                    <li onClick={() => updateReads('currentlyReading', tabData)}>Currently Reading</li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          :
          <h2>No Books added yet</h2>
        }
      </React.Fragment>

    )
  }
}