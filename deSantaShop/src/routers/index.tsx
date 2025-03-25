/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from '../components/Layouts/LayoutAdmin'
import ProductsList from '../components/Views/Admin/AdminPages/products/ProductsList'
import ProductAdd from '../components/Views/Admin/AdminPages/products/ProductAdd'
import ProductEdit from '../components/Views/Admin/AdminPages/products/ProductEdit'
import CategoriesList from '../components/Views/Admin/AdminPages/categories/CategoriesList'
import CategoryAdd from '../components/Views/Admin/AdminPages/categories/CategoryAdd'
import CategoryEdit from '../components/Views/Admin/AdminPages/categories/CategoryEdit'
import LayoutClient from '../components/Layouts/LayoutClient'
import HomePage from '../components/Views/Client/Pages/HomePage'
import NewsList from '../components/Views/Admin/AdminPages/news/NewsList'
import NewsAdd from '../components/Views/Admin/AdminPages/news/NewsAdd'
import NewsEdit from '../components/Views/Admin/AdminPages/news/NewsEdit'
import ProductsClient from '../components/Views/Client/Pages/ProductsClient'
import ProductFromCateID from '../components/Views/Admin/AdminPages/products/ProductFromCateID'

type Props = {}

const Router = (props: Props) => {
  return (
    <>
       <Routes>
           <Route path='/' element={<LayoutClient/>}>
              <Route index element={<HomePage/>}/>
              <Route path='products-client' element={<ProductsClient/>}/>
           </Route>
           <Route path='admin' element={<LayoutAdmin/>}>
              {/* Products*/}
              <Route index element={<ProductsList/>}/>
              <Route path='products' element={<ProductsList/>}/>
              <Route path='products/add' element={<ProductAdd/>}/>
              <Route path='products/:id/edit' element={<ProductEdit/>}/>
              {/*Categories */}
              <Route path='categories' element={<CategoriesList/>}/>
              <Route path='categories/add' element={<CategoryAdd/>}/>
              <Route path='categories/:id/edit' element={<CategoryEdit/>}/>
              <Route path='categories/:id/products' element={<ProductFromCateID/>}/>
              {/*News */}
              <Route path='news' element={<NewsList/>}/>
              <Route path='news/add' element={<NewsAdd/>}/>
              <Route path='news/:id/edit' element={<NewsEdit/>}/>
           </Route>
       </Routes>
    </>
  )
}

export default Router