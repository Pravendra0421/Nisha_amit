"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useLanguage } from "@/context/LanguageContext";
import axios from 'axios';
export default function Page() {

    const [form,setForm] = useState({
        name:"",
        phone:"",
        email:"",
        password:""
    });
    const {t} = useLanguage();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const changeHandler =(event:React.ChangeEvent<HTMLInputElement>)=>{
        setForm({
            ...form,
        [event?.target.name]:event?.target.value
        })

    }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if(!form.name){
      setError(t("signupNameFailed"));
      toast.error(t("signupNameFailed"));
      return
    }
    if(!form.email){
      setError(t("signupEmailFailed"));
      toast.error(t("signupEmailFailed"));
    }
    if(!form.phone){
      setError(t("signupPhoneFailed"))
      toast.error(t("signupPhoneFailed"))

    }
    if(!form.password){
      setError(t("signupPasswordFailed"))
      toast.error(t("signupPasswordFailed"))
    }
    setError("");
    setSuccess("");
    setLoading(true);
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            form.email,
            form.password
        )
        await updateProfile(userCredential.user,{
            displayName:form.name
        })
        const token = await userCredential.user.getIdToken();
        console.log(token);
        const res = await axios.post("/api/user",
            {
                name:form.name,
                email:form.email,
                phone:form.phone
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                },
            }
        )
        if(!res){
            throw new Error("failed to saved user in the backend")
        }
        setSuccess(t("submitSignup"))
    } catch (error) {
        
      console.error("signup failed", error);
      alert(t("signupFailed"));
    }finally{
        setLoading(false);
    }
  };
  return (
    <div className="shadow-input mx-auto mt-30 items-center  w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {t("welcomeSignup")}
      </h2>
      

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="fullname">{t("nameSignUp")}</Label>
            <Input id="fullname" placeholder={t("placeh1")} name="name" type="text" onChange={changeHandler} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="phone">{t("phoneSignup")}</Label>
            <Input id="phone" placeholder={t("placeh2")} name="phone" type="text" onChange={changeHandler} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">{t("emailSignup")}</Label>
          <Input id="email" placeholder="amitNisha@gmail.com" type="email" name="email" onChange={changeHandler} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">{t("passwordSignup")}</Label>
          <Input id="password" placeholder="••••••••" type="password" name="password" onChange={changeHandler} />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          {loading ? t("buttonSignup") : t("buttonSignup2")} &rarr;
          <BottomGradient />
        </button>
        <a href="/login"
          className=" mt-10 text-center group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
        >
           {t("movetoLogin")}
          <BottomGradient />
        </a>
        
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
