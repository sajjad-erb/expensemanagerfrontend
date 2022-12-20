import React, { useState } from 'react'

const InputField = (props) => {

  return (
    <div>
      <input id={props.id} type={props.type} placeholder={props.placeholder} className='bg-dark bg-white border p-2 rounded-2'
        onChange={props.onChange} />
    </div>
  )
}

export default InputField