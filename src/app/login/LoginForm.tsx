'use client'
import React, { useEffect, useRef, useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const LoginForm = () => {
  const loginContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false); // React state to control open/close
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Effect to close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (loginContainerRef.current && !loginContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event?.target.name]: event.target.value
    });
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error: unknown) {
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
    } finally {
      setLoading(false);
    }
  }

  // --- START of Tailwind CSS implementation ---
  return (
    <>
      <div
        ref={loginContainerRef}
        onClick={() => !isOpen && setIsOpen(true)}
        className={`
          animated-border 
          relative flex justify-center items-center p-2.5 
          bg-[--box-bg-color] rounded-[20px] overflow-hidden 
          transition-all duration-700 ease-in-out
          ${isOpen 
            ? 'w-[450px] h-[520px] cursor-default' 
            : 'w-[380px] h-[90px] cursor-pointer'
          }
        `}
      >
        {/* Inner solid box */}
        <div className="absolute inset-[5px] bg-[--box-bg-color] rounded-[15px] z-10"></div>

        {/* Header (Click to Login) */}
        <div
          className={`
            absolute z-20 flex items-center gap-[15px] 
            text-[--text-color] text-2xl font-semibold tracking-wide
            transition-all duration-500 ease-in-out
            ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <i className="fa-solid fa-right-to-bracket text-[--glow-cyan] [text-shadow:0_0_5px_var(--glow-cyan),_0_0_20px_var(--glow-cyan)]"></i>
          <span className='text-pink-800'>{t("welcomeLogin")}</span>
          <i className="fa-solid fa-heart text-[--glow-pink] [text-shadow:0_0_5px_var(--glow-pink),_0_0_20px_var(--glow-pink)]"></i>
        </div>

        {/* Login Form */}
        <form
          onSubmit={submitHandler}
          className={`
            relative z-20 w-full p-10 flex flex-col gap-5 
            transition-all duration-500 ease-in-out delay-300
            ${isOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-5 pointer-events-none'
            }
          `}
        >
          <h2 className='text-[--text-color] text-center font-semibold tracking-wide text-2xl'>{t("log")}</h2>
          
          <div className="relative">
            <input 
              type="text" onChange={changeHandler} name='email' value={data.email} placeholder={t("placeHolder1")} required 
              className="w-full p-[15px_20px] outline-none border-2 border-white/10 bg-transparent rounded-full text-lg text-[--text-color] transition-colors duration-300 ease-in-out placeholder:text-[--placeholder-color] focus:border-[--glow-cyan]"
            />
          </div>
          
          <div className="relative">
            <input 
              type="password" onChange={changeHandler} name='password' value={data.password} placeholder={t("placeHolder2")} required 
              className="w-full p-[15px_20px] outline-none border-2 border-white/10 bg-transparent rounded-full text-lg text-[--text-color] transition-colors duration-300 ease-in-out placeholder:text-[--placeholder-color] focus:border-[--glow-cyan]"
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-[--glow-cyan] border-none font-semibold text-lg text-[#111] cursor-pointer p-[15px_20px] rounded-full transition-shadow duration-300 ease-in-out hover:shadow-[0_0_15px_var(--glow-cyan),_0_0_30px_var(--glow-cyan)]"
          >
            {loading ? t("buttonLogin") : t("buttonLogin2")}
          </button>
          
          <div className="w-full flex justify-between px-2.5">
            <a href="/forgot-password" className="text-[--text-color] no-underline text-sm">{t("forgotPassword")}</a>
            <a href="/signup" className="text-[--glow-pink] font-semibold no-underline text-sm">{t("SignupLogin")}</a>
          </div>
          
          {error && <p style={{ color: "red" }} className="text-center">{error}</p>}
          {success && <p style={{ color: "green" }} className="text-center">{success}</p>}
        </form>
      </div>

      {/* --- START of <style jsx> --- */}
      {/* Yeh CSS sirf isi component par apply hogi */}
      <style jsx>{`
        /* CSS Variables (This part was correct) */
        :global(:root) {
          --box-bg-color: #22222b;
          --text-color: #ffffff;
          --placeholder-color: #a0a0a0;
          --glow-pink: #ff2770;
          --glow-cyan: #45f3ff;
        }

        /* Animated Border (This part was correct) */
        .animated-border::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 760px;
          height: 760px;
          background: repeating-conic-gradient(
            from var(--angle),
            var(--glow-pink) 0%,
            var(--glow-pink) 5%,
            transparent 5%,
            transparent 40%,
            var(--glow-cyan) 50%
          );
          animation: rotating-border 6s linear infinite;
          z-index: 1;
        }

        /* * FIX: Removed :global() wrapper from @-rules
         * At-rules like @property and @keyframes are automatically global
         * in styled-jsx.
         */

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotating-border {
          0% {
            --angle: 0deg;
          }
          100% {
            --angle: 360deg;
          }
        }
      `}</style>
    </>
  );
};

export default LoginForm;