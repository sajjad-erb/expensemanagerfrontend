
import React, { useState } from 'react'
import { useAddAccountsMutation } from '../../services/api/accountApi'


const AddAccount = () => {

	const [account_title, setAccount_title] = useState('')
	const [account_no, setAccount_no] = useState('')
	const [balance, setBalance] = useState('')

	const [addAccounts, { error }] = useAddAccountsMutation()


	const submitAccount = async (e) => {
		e.preventDefault()
		// if (account_title && account_no && balance) {
		// 	await addAccounts({
		// 		account_title,
		// 		account_no,
		// 		balance
		// 	})
		// }
		addAccounts({ account_title, account_no, balance })
			.unwrap()
			.then((payload) => console.log('fulfilled', payload))
			.catch((error) => console.error('rejected', error.data))
	}

	return (
		<form className='pt-4 pb-4 bg-dark col-3 mt-5 rounded-5 ms-5 pointer-class text-center' onSubmit={submitAccount}>
			<h2 className='text-white mb-3'>Add Accounts</h2>
			<input type="text" placeholder='Account Title' className='bg-dark bg-white border-0 p-2 rounded-2'
				onChange={(e) => { setAccount_title(e.target.value) }} />
			{error?.data?.account_title && <p className='text-danger'>{error.data.account_title}</p>}

			<input type="text" placeholder='Account Number' className='bg-dark mt-2 mb-2 bg-white border-0 p-2 rounded-2'
				onChange={(e) => { setAccount_no(e.target.value) }} />
			<p className='text-danger'>{error?.data?.account_no}</p>
			<input type="text" placeholder='Balance' className='bg-dark bg-white border-0 p-2 rounded-2'
				onChange={(e) => { setBalance(e.target.value) }} />
			<p className='text-danger'>{error?.data?.balance}</p>

			<button type='submit' className='mt-5 btn btn-primary'>Add Account</button>
		</form>
	)
}

export default AddAccount
