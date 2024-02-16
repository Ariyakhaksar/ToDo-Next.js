import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from 'react-hot-toast';

function SigninPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clickHandler = async () => {
    const { email, password } = formData;
    if (formData.email.length < 1  || formData.password.length < 1) {
      toast.error("لطفا اطلاعات معتبر وارد کنید");

      return;
    } else {
      const res = await signIn("credentials", { email, password, redirect: false });

      if (!res.error) router.push("/");
    }
  };

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  return (
    <>
      <div className="signin-form">
        <h3>Login Form</h3>
        <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange}></input>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <button onClick={clickHandler}>Login</button>
        <div style={{marginTop : '50px'}}>
          <p>Create an account ?</p> &nbsp;
          <Link href="/signup">Sign up</Link>
        </div>
        
      </div>
    </>
  );
}

export default SigninPage;
