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

    fetchBookInfo(isbns)
      .then((isbnData) => {

        const bookInfo = this.getBookInfo(isbnData)
        console.log('info', bookInfo)
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
    const bookInfo = this.state.bookInfo.items[0].volumeInfo.title
    console.log('info', bookInfo)
    return (
      <h1>{bookInfo}</h1>
    )
  }
}