import React from 'react'
import { useDeleteAccountsMutation, useGetAccountsQuery, useUpdateAccountsMutation } from '../../services/api/accountApi';
import Sidebar from '../Sidebar';
import AddAccount from './AddAccount';
import DeleteAccount from './DeleteAccount';
import UpdateAccount from './UpdateAccount';


const FetchAccount = () => {

	const { data, isSuccess, isLoading } = useGetAccountsQuery({ refetchOnMountOrArgChange: true })
	const [deleteAcc] = useDeleteAccountsMutation()
	const [updateAccount] = useUpdateAccountsMutation()
	// console.log(error)
	

	let content;
	if (isLoading) {
		content = <p>Loding...</p>
	} else if (isSuccess) {
		content = data.map(account => {
			return (
				<div key={account.id} className='bg-dark text-white w-25 ms-5 p-4 mt-5 rounded-5'>
					<h3>Account Title: {account.account_title}</h3>
					<h6>Account Number: {account.account_no}</h6>
					<p>Balance: {account.balance}</p>
					<div className='d-flex justify-content-around'>
						<div><UpdateAccount account={account} UpdateAccount={(account) => updateAccount(account)} /></div>
						<div><DeleteAccount DeleteAccount={() => deleteAcc(account.id)} /></div>
					</div>
				</div>
			)
		})
	}


	return (
		<div className="row">
			<div className='col-3'>
				<Sidebar />
			</div>
			<div className='col-8'>
				<h1 className='text-center mt-5'>Accounts</h1>
				<div className='row align-items-center '>
					<AddAccount />
					{content}
				</div>
			</div>
		</div>
	)
}

export default FetchAccount