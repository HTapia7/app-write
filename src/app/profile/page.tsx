"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import React, { useState }  from "react"

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("nothing")

    const logout = async () => {
        try {
          const response = await axios.get("/api/users/logout")
          toast.success("Logout Success")
          router.push("/login")
          console.log(response)
        } catch (error: any) {
          console.log("Error logging out")
          toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me")
      console.log(res.data);
      setData(res.data.data._id)
  }

    return(
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>Profile</h1>
          <hr/>
          <p>Profile page</p>
          <h2>{data === 'nothing' ? "nothing" : <Link href={`/profile/${data}`}>{data}
          </Link>}</h2>
          <hr />
          <button onClick={logout} className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded">
              logout
          </button>

          <button onClick={getUserDetails} className="bg-red-500 text-white font-bold py-2 px-4 mt-4 rounded">
              Get User Details
          </button>
      </div>
    )
};