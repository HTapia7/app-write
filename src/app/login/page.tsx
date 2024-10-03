"use client";
import Link from "next/link"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// Testing 
export default function loginPage(){
    const router = useRouter();
    const [user , setUser] = React.useState({
      email: "",
      password: "",
    })

    const [buttonDisabled, setButtonDisable] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onLogin = async () => {
      try {
        setLoading(true)
        const response = await axios.post("/api/users/login", user)
        console.log("Login Sucess" , response.data)
        router.push("/profile")
        
      } catch (error: any) {
        console.log("Login Failed" , error.message)
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      if(user.email.length > 0 && user.password.length >0 ){ 
          setButtonDisable(false)
         }
      else{
        setButtonDisable(true)
      }
    }, [user])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-green-600" >
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
    onClick={onLogin}>
      Login
    </button>
    <Link href="/signup">Visit Signup</Link>
    </div>
  )
}