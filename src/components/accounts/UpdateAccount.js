import React, { useState } from 'react'
import { useUpdateAccountsMutation } from '../../services/api/accountApi'

const UpdateAccount = ({ account, UpdateAccount }) => {

	const [account_title, setAccount_title] = useState(account.account_title)
	const [account_no, setAccount_no] = useState(account.account_no)
	const [balance, setBalance] = useState(account.balance)
	const [id] = useState(account.id)

	let update = (e) => {
		e.preventDefault()
		UpdateAccount({
			id,
			account_title,
			account_no,
			balance
		})
	}

	return (
		<div>
			<div className='d-flex justify-content-around '>
				<button type="button" className="btn btn-primary text-white border-0 px-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
					Edit
				</button>
				<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5 text-dark" id="staticBackdropLabel">Update Accounts</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<form onSubmit={update}>
								<div className="modal-body d-flex flex-column">
									{/* <input type="hidden" value={account.id} /> */}
									<input type="text" placeholder='Account Title' className='bg-dark bg-white  p-2 rounded-2'
										onChange={(e) => { setAccount_title(e.target.value) }} value={account_title} />
									<input type="text" placeholder='Account Number' className='bg-dark mt-2 mb-2 bg-white p-2 rounded-2'
										onChange={(e) => { setAccount_no(e.target.value) }} value={account_no} />
									<input type="text" placeholder='Balance' className='bg-dark bg-white  p-2 rounded-2'
										onChange={(e) => { setBalance(e.target.value) }} value={balance} />
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
									<button type="submit" className="btn btn-primary">Update</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UpdateAccount