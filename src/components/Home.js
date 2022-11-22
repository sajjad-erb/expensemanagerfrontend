import React from 'react'
import Dashboard from './dashboard/Dashboard'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <div className='row'>
      <div className='col-3'>
        <Sidebar />
      </div>
      <div className='col-8'>
        <Dashboard />
      </div>
    </div>
  )
}

export default Home