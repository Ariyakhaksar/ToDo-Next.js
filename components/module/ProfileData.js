import React from 'react'

function ProfileData({data}) {
  return (
    <div className='profile-data'>
        <div>
            <span>Name : </span>
            <p>{data.Name}</p>
        </div>
        <div>
            <span>Family : </span>
            <p>{data.Family}</p>
        </div>
        <div>
            <span>Email : </span>
            <p>{data.Email}</p>
        </div>
    </div>
    
  )
}

export default ProfileData