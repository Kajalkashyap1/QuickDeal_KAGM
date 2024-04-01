import React from 'react'
import style from './EditProfile.module.css'

const EditProfile = () => {
  return (
    <div className={style.wrapper}>
        <h3>Edit Profile</h3>
        <div className={style.inputs}>
            <h5>Basic Information</h5>
            <input 
                type="text" 
                className='{style.input}'
                placeholder="name"
                required
            />
        </div>
    </div>
  )
}

export default EditProfile