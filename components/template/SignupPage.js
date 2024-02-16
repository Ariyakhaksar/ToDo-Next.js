import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';
import React, { useEffect, useState } from "react";

function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    if (formData.email.length < 1 || formData.password.length < 1) {
      toast.error("Please enter valid information");

      return;
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") router.push("/signin");
  };

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  return (
    <form className="signin-form" onSubmit={clickHandler}>
      <h3>Registeration Form</h3>
      <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required></input>
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      ></input>
      <button type="submit">Register</button>
      <div style={{ marginTop: "50px" }}>
        <p>Have an account ?</p> &nbsp;
        <Link href="/signin">Sign in</Link>
      </div>
    </form>
  );
}

export default SignupPage;
