'use client'
import React, { useEffect, useRef, useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';

import './LoginForm.css'; // <-- Import your CSS file here
const LoginForm = () => {
  const loginContainerRef = useRef<HTMLDivElement>(null);
  const [data,setData] = useState({
    email:"",
    password:""
  });
  
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const router = useRouter();
  useEffect(() => {
    const loginContainer = loginContainerRef.current;
    if (!loginContainer) return;

    const handleOpen = () => {
      if (!loginContainer.classList.contains('open')) {
        loginContainer.classList.add('open');
      }
    };

    const handleClose = (event: MouseEvent) => {
      if (!loginContainer.contains(event.target as Node) && loginContainer.classList.contains('open')) {
        loginContainer.classList.remove('open');
      }
    };

    loginContainer.addEventListener('click', handleOpen);
    document.addEventListener('click', handleClose);

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      loginContainer.removeEventListener('click', handleOpen);
      document.removeEventListener('click', handleClose);
    };
  }, []); // Empty dependency array means this runs once on mount
  const changeHandler=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setData({
        ...data,
        [event?.target.name]:event.target.value
    });
  }
  const submitHandler =async(e:React.FormEvent<HTMLFormElement>)=>{
    setError("");
    setSuccess("");
    setLoading(true);
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );
        setSuccess("loginSuccessfully");
        router.push('/book-sangeet');

    } catch (error) {
        
      console.error("login failed failed", error);
      setError("login failed");
    }finally{
        setLoading(false);
    }
  }
  return (
    <div className="login-container" ref={loginContainerRef}>
      <div className="login-box"></div>
      <div className="login-header">
        <i className="fa-solid fa-right-to-bracket"></i>
        <span className='text-pink-800'>Welcome LOGIN</span>
        <i className="fa-solid fa-heart"></i>
      </div>
      <form className="login-form" onSubmit={submitHandler}>
        <h2 className=''>Login </h2>
        <div className="input-group">
          <input type="text" onChange={changeHandler} name='email' value={data.email} placeholder="enter the Email" required />
        </div>
        <div className="input-group">
          <input type="password" onChange={changeHandler} name='password' value={data.password} placeholder="Password" required />
        </div>
        <button type="submit" className="btn-signin">  {loading ? "Signing In..." : "Sign In"}</button>
        <div className="form-links">
          <a href="/forgot-password">Forgot Password</a>
          <a href="/signup" className="signup">Sign up</a>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default LoginForm;