'use client'
import React, { useEffect, useRef, useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import './LoginForm.css'; 
const LoginForm = () => {
  const loginContainerRef = useRef<HTMLDivElement>(null);
  const [data,setData] = useState({
    email:"",
    password:""
  });
      const {t} = useLanguage();
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
        setSuccess(t("submitSuccess"));
        router.push('/book-sangeet');

    }catch (error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    const firebaseError = error as { code: string };
    switch (firebaseError.code) {
      case 'auth/invalid-credential':
        setError(t("errorcredential"));
        break;
      case 'auth/invalid-email':
        setError(t("errorEmail"));
        break;
      case 'auth/user-disabled':
        setError(t("errorUser"));
        break;
      case 'auth/too-many-requests':
        setError(t("errorToomany"));
        break;
      default:
        setError(t("errorDefault"));
        break;
    }
  } else {
    setError(t("errorDefault"));
  }
} finally{
        setLoading(false);
    }
  }
  return (
    <div className="login-container" ref={loginContainerRef}>
      <div className="login-box"></div>
      <div className="login-header">
        <i className="fa-solid fa-right-to-bracket"></i>
        <span className='text-pink-800'>{t("welcomeLogin")}</span>
        <i className="fa-solid fa-heart"></i>
      </div>
      <form className="login-form" onSubmit={submitHandler}>
        <h2 className=''>{t("log")}</h2>
        <div className="input-group">
          <input type="text" onChange={changeHandler} name='email' value={data.email} placeholder={t("placeHolder1")} required />
        </div>
        <div className="input-group">
          <input type="password" onChange={changeHandler} name='password' value={data.password} placeholder={t("placeHolder2")} required />
        </div>
        <button type="submit" className="btn-signin">  {loading ? t("buttonLogin") : t("buttonLogin2")}</button>
        <div className="form-links">
          <a href="/forgot-password">{t("forgotPassword")}</a>
          <a href="/signup" className="signup">{t("SignupLogin")}</a>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default LoginForm;