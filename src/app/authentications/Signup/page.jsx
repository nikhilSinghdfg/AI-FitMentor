"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from 'sonner';


function page() {

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [loading, setLoading] = useState(false);

    // Handle signup
    const onSignup = async () => {

        try {

            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            // On successful signup, redirect to login page
            router.push("/authentications/Login");
            toast('Signup successfully');

        } catch (error) {
            console.log("Signup failed", error.message);
            toast.error(error.message || "An error occurred");
            toast('Signup failed');
        } finally {
            setLoading(false);
        }
    };








    return (
        <div className='fixed top-0 left-0 bg-white  right-0 bottom-0 z-10 backdrop-blur-sm  flex  justify-center items-center'>

            <div className='relative bg-white p-10 border-2 border-black  rounded-lg text-slate-500'>


                <h1 className='text-center text-2xl text-neutral-700 font-medium mb-2'>
                    Sign up
                </h1>
                <p className='text-sm '>Welcome back! please sign in to continue</p>


                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 hover:border-1 hover:border-black'>
                    <input
                        type="text"
                        placeholder='Full Name'
                        className='outline-none text-sm '
                        required
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5 hover:border-1 hover:border-black '>
                    <input
                        type="email"
                        className='outline-none text-sm'
                        placeholder='Email'
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>

                <div className={`border px-6 py-2 flex items-center gap-2 rounded-full mt-5 hover:border-1 mb-4  hover:border-black`}>
                    <input
                        type="password"
                        className='outline-none text-sm'
                        placeholder='Password'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}

                    />
                </div>


                <button onClick={onSignup} className="bg-blue-600 w-full mt-2 text-white py-2 rounded-full cursor-pointer">
                    create account
                </button>




                <p className='mt-4 text-sm text-center' >Already have an account? <span className='text-blue-600 cursor-pointer'>

                    <Link href="/authentications/Login">
                        Login
                    </Link>
                </span>
                </p>



            </div>

        </div>
    )
}

export default page