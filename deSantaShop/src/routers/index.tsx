/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from '../components/Layouts/LayoutAdmin'
import ProductsList from '../components/Views/Admin/AdminPages/products/ProductsList'
import ProductAdd from '../components/Views/Admin/AdminPages/products/ProductAdd'
import ProductEdit from '../components/Views/Admin/AdminPages/products/ProductEdit'

type Props = {}

const Router = (props: Props) => {
  return (
    <>
       <Routes>
           <Route index element={<h1>Client</h1>}>
           </Route>
           <Route path='admin' element={<LayoutAdmin/>}>
              <Route path='products' element={<ProductsList/>}/>
              <Route path='products/add' element={<ProductAdd/>}/>
              <Route path='products/:id/edit' element={<ProductEdit/>}/>
           </Route>
       </Routes>
    </>
  )
}

export default Router