import ProfileData from 'components/module/ProfileData';
import ProfileForm from 'components/module/ProfileForm'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import {CgProfile} from 'react-icons/cg'
function ProfilePage() {

    const [dataInfo , setDataInfo] = useState(null);

    const router = useRouter()

    useEffect(() => {
        fetchProfile();
    } , [])

    const fetchProfile = async () => {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if(data.status === "success" && data.data.Name && data.data.Family){
            const {Name , Family , Email} = await data.data
            setDataInfo({Name , Family , Email});
        }
    }

    const [formData , setFormData] = useState({
        name : "" ,
        family : "",
        password:""
    })

    const submitHandler =  async () =>{
        const res = await fetch('/api/profile' , {
            method : "POST" ,
            body : JSON.stringify(formData),
            headers : {'Content-Type': 'application/json'}
        });
        const data = await res.json();
        console.log(data);
        if(data.status === "success") router.reload()
    }

    return (
    <>
        <div className='profile-form'>
            <h2><CgProfile /> Profile</h2>
            {
                dataInfo ? <ProfileData data={dataInfo} /> 
                : <ProfileForm formData={formData} setFormData={setFormData} submitHandler={submitHandler} /> 
            }
            
        </div>
    </>
    )
}

export default ProfilePage
