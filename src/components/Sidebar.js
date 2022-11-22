import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FetchAccount from './accounts/FetchAccount';
import Wallet from './wallets/Wallet';
import Transactions from './transactions/Transactions'
import Dashboard from './dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { logOut } from '../services/auth/authSlice';
import { useState } from 'react';

const Sidebar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutBtn = () => {
    dispatch(logOut())
    navigate("/login");
  }

  const handleDashboard = () => {
    navigate("/");
  }

  const handleTransaction = () => {
    navigate("/transactions");
  }

  const handleAccounts = () => {
    navigate("/accounts");
  }

  const handleWallets = () => {
    navigate("/wallet");
  }


  return (
    <>
      {/* <Tabs>
        <div className='d-flex'>
          <div className='text-dark'>
            <div className='d-flex flex-column min-vh-100 justify-content-around sidebar'>
              <div>
                <TabList className='list-unstyled pointer-className'>
                  <h5 className='text-center border-bottom '>Expense Manager</h5>
                  <Tab className='bg-light p-3 mt-5 text-dark'>Dashboard</Tab>
                  <Tab className='bg-light p-3 mt-2 text-dark'>Transactions</Tab>
                  <Tab className='bg-light p-3 mt-2 text-dark'>Accounts</Tab>
                  <Tab className='bg-light p-3 mt-2 text-dark'>Wallets</Tab>
                </TabList>
              </div>
              <p className='border p-3' onClick={logoutBtn}>Sign Out</p>
            </div>
          </div>

          <div className='w-100 mt-5 ms-5'>
            <TabPanel>
              <Dashboard />
            </TabPanel>
            <TabPanel>
              <Transactions />
            </TabPanel>
            <TabPanel className="ms-5">
              <FetchAccount />
            </TabPanel>
            <TabPanel>
              <Wallet className="ms-5" />
            </TabPanel>
          </div>
        </div>
      </Tabs> */}
      <nav>
        <div className="navbar-width mx-4">
          <div>
            <h3 className='text-center mt-5'>Expense Manager</h3>
            <p className="px-3 bg-dark text-white border py-3  rounded-borders mt-5 pointer-class n" onClick={handleDashboard}
            >Dashboard</p>
            <p className="px-3 bg-dark py-3 text-white rounded-borders pointer-class" onClick={handleTransaction}>Transaction</p>
            <p className="px-3 bg-dark py-3 text-white rounded-borders pointer-class" onClick={handleAccounts}>Accounts</p>
            <p className="px-3 bg-dark py-3 text-white rounded-borders pointer-class" onClick={handleWallets}>Wallets</p>
            <p className="px-3 bg-light py-3 text-dark border rounded-borders pointer-class mt-5" onClick={logoutBtn}>LogOut</p>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Sidebar