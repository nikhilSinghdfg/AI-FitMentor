'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'


function page() {


    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)


    const verifyUserEmail = async () => {

        const response = await axios.post("/api/users/verifyemail", { token })
        try {
            setVerified(true)
            setError(false)

        } catch (error) {
            setError(true)
            console.log(error.response.data);

        }


    }

    useEffect(() => {

        setError(false)
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

    }, [])

    useEffect(() => {

        setError(false)
        if (token.length > 0) {
            verifyUserEmail()
        }

    }, [token])



    return (
        <div className="flex flex-col bg-white items-center justify-center min-h-screen py-2">

        <h1 className="text-4xl text-black">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

        {verified && (
            <div>
                <h2 className="text-2xl text-black">Email Verified</h2>
                <Link href="/pages/Dashboard">
                    Login
                </Link>
            </div>
        )}
        {error && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                
            </div>
        )}
    </div>
    )
}

export default page