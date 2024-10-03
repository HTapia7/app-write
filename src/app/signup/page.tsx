"use client";
import Link from "next/link"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function signUpPage(){
    const router = useRouter()
    const [user , setUser] = React.useState({
      email: "",
      password: "",
      username: "",
    })

    const [buttonDisabled, setButtonDisable] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onSignup = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/signup" , user )
        console.log("sign up sucess" , response.data)
        router.push("/login")

      } catch (error: any) {
        console.log("Sign Up failed" , error.message)
          toast.error(error.message)
      } finally{
          setLoading(false)
      }
    }
    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 &&
         user.username.length >0 ){ 
          setButtonDisable(false)
         }
      else{
        setButtonDisable(true)
      }
    }, [user])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-blue-800">
      <h1>{loading ? "Processing" : "Sign Up"}</h1>
      <hr/>
      <label htmlFor="username">username</label>
      <input className="p-2"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="Username"
      />

      <label htmlFor="email">email</label>
      <input className="p-2"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input className="p-2"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="Password"
      />

    <button className="p=2 border border-gray-300 rounded-lg mb-4"
    onClick={onSignup}>
      Sign Up
    </button>
    <Link href="/login">{buttonDisabled ? "No sign up" : "Sign Up"}</Link>
    </div>
  )
}