"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from 'sonner';



function page() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    })

    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast('Login successfully');
            router.push("/pages/Dashboard");
        } catch (error) {
            console.log("Login failed", error.message);
            toast("Login failed");
        } finally {
            setLoading(false);
        }
    }











    return (
        <div className='fixed top-0 left-0 bg-white  right-0 bottom-0 z-10 backdrop-blur-sm  flex  justify-center items-center'>

            <div className='relative bg-white p-10 border-2 border-black  rounded-lg text-slate-500'>


                <h1 className='text-center  text-2xl text-neutral-700 font-medium mb-2'>
                    Login
                </h1>


                <p className='text-sm '>Welcome back! please sign in to continue</p>


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

                <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>


                <button onClick={onLogin} className="bg-blue-600 w-full mt-2 text-white py-2 rounded-full cursor-pointer">login</button>




                <p className='mt-4 text-sm text-center' >Don't have an account? <span className='text-blue-600 cursor-pointer'>
                    <Link href="/authentications/Signup">
                        sign up
                    </Link>
                </span></p>



            </div>

        </div>
    )

}

export default page