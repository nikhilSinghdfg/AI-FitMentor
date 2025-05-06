'use client';
import React from 'react'
import { useAppContext } from '@/app/userContext/page'
import { useRouter } from 'next/navigation'


function page() {

  const { data, setData } = useAppContext()

  const router = useRouter()

  const gethomepage = async () => {
    router.push("/pages/Dashboard")
  }

 

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-white flex  justify-center items-center'>

      <div className=' h-[250px] w-[290px] rounded-sm  bg-white border-2 border-black'>


        <button onClick={gethomepage} className='absolute cursor-pointer left-[470px] mt-3 ml-[400px] font-bold w-4 text-black' >X</button>

        <h1 className='text-black p-2 pt-9 '>NAME:{data.username}</h1>
        <h1 className='text-black p-2 pt-9 '>EMAIL:{data.email}</h1>




      </div>

    </div>


  )
}

export default page