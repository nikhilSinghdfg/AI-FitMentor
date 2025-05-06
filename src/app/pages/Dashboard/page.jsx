import React from 'react'
import Header from '@/app/component/Header/page'
import Footer from '@/app/component/Footer/page'
import AddNewInterview from '../AddNewInterview/page'


function page() {
  return (
    <div>
      <Header />
      <main className='bg-white h-[650px]  pt-[60px]'>
        <div>

          <div className="p-10 ">

            <h2 className="font-bold text-2xl">Dashboard</h2>
            <h2 className="text-gray-500">Create and Begin Your AI-Powered Language Chat</h2>


            <div className="grid grid-cols-1  md:grid-cols-3 my-5">

              <AddNewInterview />


            </div>



          </div>



        </div>
      </main>
      <Footer />
    </div>
  )
}

export default page