import React from 'react'
import ReactDOM from 'react-dom'
import BookList from './components/BookList'
import BookInfo from './components/BookInfo'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles.css'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='container'>
        <Router>
          <Route exact path='/' component={BookList} />
          <Route path='/book-info' component={BookInfo} />
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)