import React, { useState } from 'react'
import Select from 'react-select'
import { useGetAccountsQuery } from '../../services/api/accountApi'
import { useAddTransactionsMutation } from '../../services/api/transactionApi'


export const TransactionType = () => {

	const [type, setType] = useState(null)
	const [category, setCategory] = useState(null)
	const [amount, setAmount] = useState(null)
	const [transfer_from_type, setTransfer_from_type] = useState(null)
	const [transfer_from_id, setTransfer_from_id] = useState(null)
	const [transfer_to_type, setTransfer_to_type] = useState(null)
	const [transfer_to_id, setTransfer_to_id] = useState(null)

	const { data, isSuccess, isLoading } = useGetAccountsQuery()

	const [addTransactions] = useAddTransactionsMutation()

	const typeOptions = [
		{ value: 'Expense', label: 'Expense' },
		{ value: 'BankTransfer', label: 'Bank Transfer' },
		{ value: 'Income', label: 'Income' }
	]

	const categoryOptions = [
		{ value: 'food', label: 'Food' },
		{ value: 'transport', label: 'Transport' },
		{ value: 'accommodation', label: 'Accommodation' },
		{ value: 'shopping', label: 'Shopping' },
		{ value: 'entertainement', label: 'Entertainement' }
	]

	const transferFromTypeOption = [
		{ value: 'Account', label: 'Account' },
		{ value: 'Wallet', label: 'Wallet' }
	]

	const transferToTypeOption = [
		{ value: 'Account', label: 'Account' },
		{ value: 'Wallet', label: 'Wallet' }
	]

	const transferFromIdOption = data?.map(account => {
		return {
			value: account.id,
			label: account.account_title
		}
	})

	const transferToIdOption = data?.map(account => {
		return {
			value: account.id,
			label: account.account_title
		}
	})

	const handleType = (value) => {
		const type = value.value
		setType(type)
	}

	const handleCategory = (value) => {
		const category = value.value
		setCategory(category)
	}

	const handletransferFromTypeOption = (value) => {
		const transfer_from_type = value.value
		setTransfer_from_type(transfer_from_type)
	}

	const handletransferFromIdOption = (value) => {
		const transfer_from_id = value.value
		setTransfer_from_id(transfer_from_id)
	}

	const handletransferToTypeOption = (value) => {
		const transfer_to_type = value.value
		setTransfer_to_type(transfer_to_type)
	}

	const handletransferToIdOption = (value) => {
		const transfer_to_id = value.value
		setTransfer_to_id(transfer_to_id)
	}


	const handleTransaction = async (e) => {
		e.preventDefault()
		await addTransactions({
			type,
			category,
			amount,
			transfer_from_type,
			transfer_from_id,
			transfer_to_id,
			transfer_to_type
		})
	}

	return (
		<div>
			<button type="button" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				Add Transactions
			</button>
			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5 text-dark" id="staticBackdropLabel">Select your Transaction Type</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<form onSubmit={handleTransaction}>
							<div className="modal-body">
								<Select options={typeOptions} onChange={handleType} placeholder='Select Transaction Type' />
								{type === 'Expense' && <div>
									<Select options={categoryOptions} onChange={handleCategory} placeholder='Select Category' className='mt-2' />
									<input className="form-control mt-2" onChange={(e) => { setAmount(e.target.value) }} type="number" placeholder="Amount" />
									<Select options={transferFromTypeOption} onChange={handletransferFromTypeOption} placeholder='Account or Wallet' className='mt-2' />
									{transfer_from_type === 'Account' && <div>
										<Select options={transferFromIdOption} onChange={handletransferFromIdOption} placeholder='Select Accounts' className='mt-2' />
									</div>}
									<button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3'>Add Expense</button>
								</div>
								}
								{type === 'Income' && <div>
									<input className="form-control mt-2" onChange={(e) => { setAmount(e.target.value) }} type="number" placeholder="Amount" />
									<Select options={transferToTypeOption} onChange={handletransferToTypeOption} placeholder='Account or Wallet' className='mt-2' />
									{transfer_to_type === 'Account' && <div>
										<Select options={transferToIdOption} onChange={handletransferToIdOption} placeholder='Select Accounts' className='mt-2' />
									</div>}
									<button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3'>Add Income</button>
								</div>
								}
								{type === 'BankTransfer' && <div>
									<input className="form-control mt-2" onChange={(e) => { setAmount(e.target.value) }} type="number" placeholder="Amount" />
									<Select options={transferFromTypeOption} onChange={handletransferFromTypeOption} placeholder='Account or Wallet' className='mt-2' />
									{transfer_from_type === 'Account' && <div>
										<Select options={transferFromIdOption} onChange={handletransferFromIdOption} placeholder='Select Accounts' className='mt-2' />
									</div>}
									<Select options={transferToTypeOption} onChange={handletransferToTypeOption} placeholder='Transfer to Account or Wallets' className='mt-2' />
									{transfer_to_type === 'Account' && <div>
										<Select options={transferToIdOption} onChange={handletransferToIdOption} placeholder='Select Accounts' className='mt-2' />
									</div>}
									<button type='submit' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3'>Bank Transfer</button>
								</div>}
							</div>
						</form>
					</div>
				</div>
			</div></div>
	)
}

export default TransactionType