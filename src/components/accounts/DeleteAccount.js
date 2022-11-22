import React from 'react'

const DeleteAccount = ({DeleteAccount}) => {

	return (
		<div>
			<button className=' btn btn-danger text-white border-0 px-2' onClick={DeleteAccount}>Delete</button>
		</div>
	)
}

export default DeleteAccount