import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function SignupPage() {

    const router = useRouter()
    const [formData , setFormData] = useState({
        email : "",
        password : ""
    })

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({...formData , [name] : value});
    }

    const clickHandler = async(e) =>{
        e.preventDefault();

        const res = await fetch("/api/auth/signup" , {
            method:"POST",
            body: JSON.stringify(formData),
            headers : {'Content-Type': 'application/json'}
        })
        const data = await res.json();
        if(data.status === "success") router.push("/signin")
    }

    const {status} = useSession()

    useEffect(()=> {
        if(status === "authenticated") router.replace("/")
    } , [status])



    return (
        <div className='signin-form'>
            <h3>Registeration Form</h3>
            <input type='text' placeholder='Email' name='email' value={formData.email} onChange={handleChange} ></input>
            <input type='password' placeholder='Password'name='password' value={formData.password} onChange={handleChange} ></input>
            <button onClick={clickHandler}>Register</button>
            <div>
                <p>Have an account ?</p> &nbsp;
                <Link href="/signin">Sign in</Link>
            </div>
        </div>
    )
}

export default SignupPage