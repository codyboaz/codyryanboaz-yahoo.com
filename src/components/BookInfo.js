import React from 'react'
import { fetchBookInfo } from '../utils/api'

export default class BookInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading',
      bookInfo: null
    }
    this.getBookInfo = this.getBookInfo.bind(this)
  }
  componentDidMount() {
    const { isbns } = this.props.location.state
    console.log(isbns)

    fetchBookInfo(isbns)
      .then((isbnData) => {

        const bookInfo = this.getBookInfo(isbnData)
        this.setState({
          status: 'ready',
          bookInfo
        })
      })
  }

  getBookInfo(isbnData) {
    let bookInfo = isbnData.find((isbn) => isbn.totalItems === 1);

    bookInfo = bookInfo === undefined ? { items: [{ volumeInfo: { title: 'Book info not found' } }] } : bookInfo
    return bookInfo;
  }

  render() {
    if (this.state.status === 'loading') {
      return <h1>Loading</h1>
    }
    const { title, authors, description, pageCount, averageRating, ratingsCount, categories, imageLinks: { thumbnail } } = this.state.bookInfo.items[0].volumeInfo
    return (
      <div className='book-info-container'>
        <h1>{title}</h1>
        <p>Rating: {averageRating} ({ratingsCount})</p>
        <img src={thumbnail} alt={title} />
        <p>Written by: {authors}</p>
        <p>PageCount: {pageCount}</p>
        <p>{description}</p>
        <p>Categories: {categories.map((category) => category)}</p>
      </div>
    )
  }
}