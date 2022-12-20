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

  const handleGroupExpense = () => {
    navigate("/group-expenses")
  }


  return (
    <>
      <nav>
        {/* <div className="navbar-width mx-4">
          <div>
            <h3 className='text-center text-4xl mt-5'>Expense Manager</h3>
            <p className="px-3 bg-dark text-white border py-3  rounded-borders mt-5 pointer-className n" onClick={handleDashboard}
            >Dashboard</p>
            <p className="px-3 bg-dark py-3 text-white rounded-borders pointer-className" onClick={handleTransaction}>Transaction</p>
            <p className="px-3 bg-dark py-3 text-white rounded-borders pointer-className" onClick={handleAccounts}>Accounts</p>
            <p className="px-3 bg-dark py-3 text-white rounded-borders pointer-className" onClick={handleWallets}>Wallets</p>
            <p className="px-3 bg-dark py-3 text-white rounded-borders pointer-className" onClick={handleGroupExpense}>Group Expense</p>
            <p className="px-3 bg-light py-3 text-dark border rounded-borders pointer-className mt-5" onClick={logoutBtn}>LogOut</p>
          </div>
        </div> */}

        <aside className="w-64 " aria-label="Sidebar">
          <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 min-vh-100">
            <a href="https://flowbite.com/" className="flex items-center pl-2.5 mb-5">
              <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-7" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Expense Tracker</span>
            </a>
            <ul className="space-y-2">
              <li onClick={handleDashboard}>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li onClick={handleTransaction}>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Transactions</span>
                </a>
              </li>
              <li onClick={handleAccounts}>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Accounts</span>
                </a>
              </li>
              <li onClick={handleWallets}>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Wallets</span>
                </a>
              </li>
              <li onClick={handleGroupExpense}>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Group Expenses</span>
                </a>
              </li>
              <li onClick={logoutBtn} >
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                </a>
              </li>
          
            </ul>
          </div>
        </aside>

      </nav>
    </>
  )
}

export default Sidebar