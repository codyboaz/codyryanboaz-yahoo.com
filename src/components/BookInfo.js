import React from 'react'
import { fetchBookInfo } from '../utils/api'
import Loading from './Loading'

export default class BookInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading',
      bookInfo: null,
      bookInfoFound: false
    }
    this.getBookInfo = this.getBookInfo.bind(this)
  }
  componentDidMount() {
    const { isbns } = this.props.location.state

    fetchBookInfo(isbns)
      .then((isbnData) => {
        const bookInfo = this.getBookInfo(isbnData)
        this.setState({
          status: 'ready',
          bookInfo,
          bookInfoFound: bookInfo.items[0].volumeInfo.title !== 'Book info not found' ? true : false
        })
      })
  }

  getBookInfo(isbnData) {
    let bookInfo = isbnData.find((isbn) => isbn.totalItems === 1)
    bookInfo = bookInfo == undefined ? { items: [{ volumeInfo: { title: 'Book info not found' } }] } : bookInfo
    return bookInfo;
  }

  render() {
    if (this.state.status === 'loading') {
      return <Loading />
    }
    if (!this.state.bookInfoFound) {
      return <h1>{this.state.bookInfo.items[0].volumeInfo.title}</h1>
    }
    const { title, authors, description, pageCount, averageRating, ratingsCount, categories, imageLinks: { thumbnail } } = this.state.bookInfo.items[0].volumeInfo

    return (
      <div className='book-info-container'>
        <h1>{title}</h1>
        <p>Rating: {averageRating ? `${averageRating} (${ratingsCount})` : 'No Ratings Yet'}</p>
        <img src={thumbnail} alt={title} />
        <p>Written by: {authors}</p>
        <p>PageCount: {pageCount}</p>
        <p>{description}</p>
        {categories &&
          <p>Categories: {categories.map((category) => category)}</p>
        }
      </div>
    )
  }
}