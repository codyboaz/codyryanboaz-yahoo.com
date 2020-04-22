import React from 'react'
import { Link } from 'react-router-dom'

export default function Tabs({ tabs, currentTab, updateCurrentTab }) {
  return (
    <React.Fragment>
      <div className='tabs-container'>
        <ul className='tabs'>
          {tabs.map((tab) => (
            <li
              key={tab.value}
              className='tab-item'>
              <Link
                to='/'
                className={tab.value === currentTab ? 'active' : null}
                onClick={() => updateCurrentTab(tab.value)}
              >{tab.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}
