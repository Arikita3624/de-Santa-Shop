import React from 'react'
import CountdownTimer from '../Support/CountdownTimer'


const HomePage = () => {

  return (
    <div>
        {/*Promotion */}
        <div className='w-full flex justify-center items-center mt-10 mb-10'>
            <div className='w-1/2 border-t border-black'></div>
                <h2 className='text-2xl font-semibold mx-4 whitespace-nowrap flex-shrink-0'>PROMOTIONAL TODAY</h2>
            <div className='w-1/2 border-t border-black'></div>
        </div>
        {/*Banner Promotional */}
        <div className='banner w-full flex justify-center'>
            <img src="https://hstatic.net/744/1000088744/1000124945/banner_lena3_1.jpg?v=176" alt="banner-promotional" className='w-full'/>
        </div>
        {/*Policy */}
        <div className='w-full flex justify-center gap-4 mt-8 mb-8'>            <div className='w-1/3 border border-black p-8 flex items-center justify-center'>
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
        {/*Product Menu */}
        <div className='flex items-center justify-between w-full border-b pb-2'>
                <div className='flex space-x-4'>
                    <button className='font-bold text-black hover:text-gray-400 transition'>NEW PRODUCTS</button>
                        <span className='text-gray-400'></span>
                    <button className='font-bold text-black hover:text-gray-400 transition'>BEST SALE</button>
                        <span className='text-gray-400'></span>
                    <button className='font-bold text-black hover:text-gray-400 transition'>PROMOTIONAL</button>
                </div>
                    <button className='bg-black text-white px-4 py-1 uppercase font-bold hover:bg-gray-400 transition'>SEE MORE</button>
        </div>
        {/*Product List */}
        <div className='mx-auto p-4 w-full'>
                <div className='grid grid-cols-4 gap-6'>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div className='mb-8 mt-4'>
            <CountdownTimer />
        </div>
        {/*Product Menu */}
        <div className='flex items-center justify-between w-full border-b pb-2'>
                <div className='flex space-x-4'>
                    <button className='font-bold text-black hover:text-gray-400 transition'>FEMALE FASHION</button>
                        <span className='text-gray-400'></span>
                    <button className='font-bold text-black hover:text-gray-400 transition'>MALE FASHION</button>
                        <span className='text-gray-400'></span>
                    <button className='font-bold text-black hover:text-gray-400 transition'>TOOLS</button>
              </div>
              <button className='bg-black text-white px-4 py-1 uppercase font-bold hover:bg-gray-400 transition'>SEE MORE</button>
         </div>
        {/*Product List */}
        <div className='mx-auto p-4 w-full'>
                <div className='grid grid-cols-4 gap-6'>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-6'>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='relative bg-white shadow-lg p-2'>
                        <img src="https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-[350px] object-cover'/>
                        <span className='absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold'>SALE</span>
                        <div className='text-center'>
                            <h3 className='text-[15px] font-semibold text-gray-700'>Product Name</h3>
                            <div className='flex items-center justify-center gap-2 mt-1'>
                                <p className='text-[26px] font-semibold text-black leading-[1]'>20<span className='text-[18px]'>$</span></p>
                                <p className='text-gray-400 line-through text-[18px] leading-[1]'>200<span className='text-[18px]'>$</span></p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default HomePage