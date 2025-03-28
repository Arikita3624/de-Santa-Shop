/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderClient from '../Views/HFER/Client/HeaderClient'
import FooterClient from '../Views/HFER/Client/FooterClient'


const LayoutClient = () => {
  return (
    <div className='container mx-auto px-40'>
            <HeaderClient search={function (value: string): void {
        throw new Error('Function not implemented.')
      } } />
            <Outlet />
        <div>
            <FooterClient />
        </div>
    </div>
  )
}

export default LayoutClient