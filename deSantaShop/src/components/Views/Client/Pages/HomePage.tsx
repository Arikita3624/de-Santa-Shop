import React from 'react'


const HomePage = () => {
  return (
    <div>
        <div className='w-full flex justify-center items-center mt-10 mb-10'>
            <div className='w-1/2 border-t border-black'></div>
                <h2 className='text-2xl font-semibold mx-4 whitespace-nowrap flex-shrink-0'>PROMOTIONAL TODAY</h2>
            <div className='w-1/2 border-t border-black'></div>
        </div>
        <div className='banner w-full flex justify-center'>
            <img src="https://hstatic.net/744/1000088744/1000124945/banner_lena3_1.jpg?v=176" alt="banner-promotional" className='w-full'/>
        </div>
        <div className='w-full flex justify-center gap-4 mt-8 mb-8'>
            <div className='w-1/3 border border-black p-8 flex items-center justify-center'>
                <img src="https://hstatic.net/744/1000088744/1000124945/policy_1.png?v=176" alt="Free Shipping" className="w-10 h-10 mr-4" />
                <h3 className='text-2xl font-semibold'>FREE SHIPPING</h3>
            </div>
            <div className='w-1/3 border border-black p-8 flex items-center justify-center'>
                <img src="https://hstatic.net/744/1000088744/1000124945/policy_1.png?v=176" alt="Support 24/7" className="w-10 h-10 mr-4" />
                <h3 className='text-2xl font-semibold'>SUPPORT 24/7 SERVICES</h3>
            </div>
            <div className='w-1/3 border border-black p-8 flex items-center justify-center'>
                <img src="https://hstatic.net/744/1000088744/1000124945/policy_1.png?v=176" alt="Refund 100%" className="w-10 h-10 mr-4" />
                <h3 className='text-2xl font-semibold'>REFUND 100%</h3>
            </div>
        </div>
    </div>
  )
}

export default HomePage