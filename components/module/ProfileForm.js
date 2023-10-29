import React from 'react'

function ProfileForm({formData , setFormData , submitHandler}) {

    const changeHandler = e => {
        const {name , value} = e.target;
        setFormData({...formData , [name] : value})
    }

    return (
        <div className='profile-form__input'>
            <div>
                <label htmlFor='name'>Name :</label>
                <input id='name' name='name' type='text' value={formData.name} onChange={changeHandler} />
            </div>
            <div>
                <label htmlFor='family'>Family :</label>
                <input id='family' name='family' type='text' value={formData.family} onChange={changeHandler} />
            </div>
            <div>
                <label htmlFor='password'>Password :</label>
                <input id='password' name='password' type='text' value={formData.password} onChange={changeHandler} />
            </div>
            <button onClick={submitHandler}>Save</button>
        </div>
    )
}

export default ProfileForm