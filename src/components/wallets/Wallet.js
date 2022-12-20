import React, { useEffect } from 'react'
import { useGetwalletsQuery } from '../../services/api/walletApi'
import Sidebar from '../Sidebar'


const Wallet = () => {

  const { data, isSuccess, isLoading } = useGetwalletsQuery({ refetchOnMountOrArgChange: true })

  return (
    <div className='row'>
      <div className='col-3'>
        <Sidebar/>
      </div>
      <div className='text-center col-8 mt-5 text-4xl'>
        <h2>Wallet</h2>
        {<h3>Wallet Balance: {data?.balance}</h3>}
      </div>
    </div>
  )
}

export default Wallet