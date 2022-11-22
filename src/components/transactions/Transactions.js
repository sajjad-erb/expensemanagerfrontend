import React, { useState } from 'react'
import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { useDeleteTransactionsMutation, useGetTransactionsQuery, useListTransactionQuery } from '../../services/api/transactionApi'
import Sidebar from '../Sidebar'
import TransactionType from './TransactionType'

const Transactions = () => {

	const [page, setPage] = useState(1);

	const { data, isLoading, isFetching } = useListTransactionQuery(page);
	// console.log(data?.length)



	// const { data, isSuccess, isLoading } = useGetTransactionsQuery({ refetchOnMountOrArgChange: true })
	const [delTransaction] = useDeleteTransactionsMutation()

	if (isLoading) {
		return <div>Loading</div>;
	}


	// if (!transaction?.data) {
	// 	return <div>No Transaction :(</div>;
	// }

	// let content;
	// if (isLoading) {
	// 	content = <p>Loading...</p>
	// } else if (isSuccess) {
	// 	content = data.map(transaction => {
	// 		return (
	// 			<div key={transaction.id} className="border d-flex justify-content-between align-items-center p-3">
	// 				<h6>{transaction.category}</h6>
	// 				<h6>Amount: {transaction.amount}</h6>
	// 				<button className='btn btn-danger' onClick={() => delTransaction(transaction.id)}>DeleteTransactions</button>
	// 			</div>
	// 		)
	// 	})
	// }

	let content;
	content = data?.map(transaction => {
		return (
			<div key={transaction.id} className="border d-flex justify-content-between align-items-center p-3">
				<h6>{transaction.category}</h6>
				<h6>Amount: {transaction.amount}</h6>
				<button className='btn btn-danger' onClick={() => delTransaction(transaction.id)}>DeleteTransactions</button>
			</div>
		)
	})

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage(page - 1)
		}
	}


	const handleNextPage = () => {
		if (page < data?.length) {
			setPage(page + 1)
		}
	}
	


	return (
		<div>
			<div className='row align-items-center'>
				<div className='col-3'>
					<Sidebar />
				</div>
				<div className='col-8'>
					<h1 className='text-center'>Transations</h1>
					<div className='text-center mb-4'><TransactionType /></div>
					<h4>Transaction History</h4>
					{content}
					<div className='text-center mt-3'>
						<button onClick={handlePreviousPage} className="btn btn-primary" >
							Previous
						</button>
						<button
							onClick={handleNextPage} className="btn btn-secondary mx-2"
						>
							Next
						</button>
					</div>
				</div>

			</div>
		</div>
	)
}

export default Transactions