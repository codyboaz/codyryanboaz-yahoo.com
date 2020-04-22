import React from 'react'
import { Link } from 'react-router-dom'
import MyReads from '../images/my-reads.svg'

export default function Nav() {
  return (
    <nav className='main-nav'>
      <ul className='main-nav-items'>
        <li className='main-nav-logo-container'>
          <Link to='/'>
            <img className='main-nav-logo' src={MyReads} alt='My Reads Logo' />
          </Link>
        </li>
      </ul>
    </nav>
  )
}