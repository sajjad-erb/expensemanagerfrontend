import React, { useEffect, useRef, useState } from 'react'

import { useGetGroupsQuery, useGetGroupuserQuery } from '../../services/api/groupApi'
import Sidebar from '../Sidebar'
import CreateGroup from './CreateGroup'
import InputField from './InputField'
import Select from 'react-select'
import { Checkbox, Radio } from 'antd';
import { useAddgroupExpensesMutation } from '../../services/api/groupExpenseApi'


export const GroupExpense = () => {

	const [amount, setAmount] = useState('')
	const [group_id, setGroup_id] = useState()
	const [category, setCategory] = useState('')
	const [payers_attributes, setPayers_attributes] = useState([])
	const [split, setSplit] = useState();
	const [userData, setUserData] = useState([])

	const { data } = useGetGroupsQuery({ refetchOnMountOrArgChange: true })

	const { groupUsers } = useGroupUsers(group_id);

	// setting user data state when we get group_users
	useEffect(() => {

		if (groupUsers && groupUsers.length > 0) {
			setUserData(groupUsers?.map(user => {
				// user => hash
				// adding selected, paid and payable to each user of groupUsers
				// and adding that in userData
				return { ...user, selected: false, paid: 0, payable: 0 }
			}))
		}
	}, [groupUsers])

	const [addgroupExpenses] = useAddgroupExpensesMutation()

	const categoryOptions = [
		{ value: 'food', label: 'Food' },
		{ value: 'transport', label: 'Transport' },
		{ value: 'accommodation', label: 'Accommodation' },
		{ value: 'shopping', label: 'Shopping' },
		{ value: 'entertainement', label: 'Entertainement' }
	]

	const splitOptions = [
		{ value: 'equally', label: 'equally' },
		{ value: 'percentage', label: 'percentage' },
		{ value: 'unequally', label: 'unequally' }
	]

	const content = data?.map(group => {
		return {
			value: group.id,
			label: group.name
		}
	})

	let contentUser;
	contentUser = groupUsers?.map(user => {
		return (
			<div key={user.id}>
				<h6>{user.email}</h6>
			</div>
		)
	})

	// Event handler for when a radio button is clicked
	const handleChangeSplit = (value) => {
		const split = value.value
		setSplit(split);
	};

	const handleGroup = (value) => {
		const group = value.value
		setGroup_id(group)
	}

	const handleCategory = (value) => {
		const category = value.value
		setCategory(category)
	}

	// updating amount payable of selected users on changing of amount
	// or selected user count
	useEffect(() => {
		let amountPayable = amount / (payers_attributes.length)
		if (split === 'equally') {
			setPayers_attributes(payers_attributes.map((user) => { return { ...user, payable: amountPayable } }))
			setUserData(userData.map(u => u.selected ? { ...u, payable: amountPayable } : { ...u }))
		}
	}, [amount, payers_attributes.length])

	const handleSelectedUser = (e) => {

		const { id, checked } = e.target;

		if (checked) {
			setUserData(userData.map(u => u.id == id ? { ...u, selected: true, paid: 0, payable: 0 } : { ...u }))
			setPayers_attributes([...payers_attributes, { 'user_id': id, 'paid': 0, 'payable': 0 }]);
		}
		else {
			setUserData(userData.map(u => u.id == id ? { ...u, selected: false, paid: 0, payable: 0 } : { ...u }))
			setPayers_attributes(payers_attributes.filter(user => user['user_id'] !== id));
		}
	}


	const handlePaid = (e) => {
		const { id, value } = e.target;
		setUserData(userData.map((user) => user.id == id ? { ...user, paid: value } : { ...user }))
		setPayers_attributes(payers_attributes.map((user) => user.user_id == id ? { ...user, paid: value } : { ...user }))

	}
	const handlePayable = (e) => {
		const { id, value } = e.target;

		setPayers_attributes(payers_attributes.map((user) => user.user_id == id ? { ...user, payable: value } : { ...user }))
		setUserData(userData.map((user) => user.id == id ? { ...user, payable: value } : { ...user }))
	}

	const handleGroupExpense = async (e) => {

		e.preventDefault()
		const group_expense = {
			amount,
			category,
			group_id,
			split,
			payers_attributes,
		}
		await addgroupExpenses({
			group_expense
		})

	}

	return (
		<div className='grid grid-cols-12'>
			<div className='col-span-3'>
				<Sidebar />
			</div>
			<div className='col-span-9  vh-100 pt-5 px-3 overflow-scroll'>
				<div className='flex items-center justify-between border-b pb-3'>
					<h1 className='text-4xl'>Group Expense</h1>
					<CreateGroup />
				</div>
				<form className='mt-3' onSubmit={handleGroupExpense}>
					<div>
						<label>Amount</label>
						<InputField type="number" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
					</div>
					<div className='w-25'>
						<label>Groups</label>
						<Select isClearable options={content} onChange={handleGroup} />
					</div>
					<div className='w-25'>
						<label>Categories</label>
						<Select options={categoryOptions} onChange={handleCategory} placeholder='Select Category' className='mt-2' />
					</div>
					<div>
						<label>Split By</label>
						<div>
							<Select options={splitOptions} onChange={handleChangeSplit} placeholder='Select Split' className='mt-2 w-25' />
							<label>Users in this group</label> <br />

							{split === 'equally' &&
								<>
									<div className='flex text-2xl justify-between'>
										<h3>Users</h3>
										<h3>Amount Paid</h3>
										<h3>Amount payable</h3>
									</div>

									<div className='space-y-2' >
										{userData?.map((user) =>
											<div key={user.id} className='flex items-center justify-between border p-2'  >
												<Checkbox className='w-[155px]' id={user.id} onChange={handleSelectedUser} checked={user.selected}>
													{user.email}
												</Checkbox>
												{<InputField id={user.id} type='number' placeholder='Amount Paid' onChange={handlePaid} value={user.paid} />}
												{
													<InputField id={user.id} type='number' placeholder='Amount Payable' value={user.payable} onChange={handlePayable} readOnly={split === 'equally'} />}
											</div>
										)}
									</div>
								</>
							}
							{split === 'percentage' &&
								<>
									<div className='flex text-2xl justify-between'>
										<h3>Users</h3>
										<h3>Amount Paid</h3>
										<h3>Amount Percentage</h3>
										<h3>Amount payable</h3>
									</div>
									<div className='space-y-2' >
										{groupUsers?.map(user =>
											<div key={user.id} className='flex items-center justify-between border p-2'  >
												<Checkbox className='w-[155px]' id={user.id} onChange={handleSelectedUser} >
													{user.email}
												</Checkbox>
												{<InputField id={user.id} type='number' placeholder='Amount Paid' onChange={handlePaid} />}
												{<InputField id={user.id} step='0.01'
													type='number' placeholder='percentage' onChange={handlePaid} />}
												{<InputField id={user.id} type='number' placeholder='Amount Payable' onChange={handlePayable} />}
											</div>
										)}
									</div>
								</>}


						</div>
					</div>

					<button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-3">Create a Group Expense</button>
				</form>
			</div>
		</div>
	)
}

export const useGroupUsers = (groupId) => {
	const { data: groupUsers, loading, error } = useGetGroupuserQuery({ id: groupId });
	return { groupUsers, loading, error }
}