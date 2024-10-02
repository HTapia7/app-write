"use client";
import Link from "next/link"
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function signUpPage(){
    const [user , setUser] = React.useState({
      email: "",
      password: "",
      username: "",
    })

    const onSignup = async () => {
      
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
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
    <Link href="/login">Visit Login</Link>
    </div>
  )
}