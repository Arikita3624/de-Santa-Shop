/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/controller/ProtectedRoute';
import LayoutAdmin from '../components/Layouts/LayoutAdmin';
import ProductsList from '../components/Views/Admin/AdminPages/products/ProductsList';
import ProductAdd from '../components/Views/Admin/AdminPages/products/ProductAdd';
import ProductEdit from '../components/Views/Admin/AdminPages/products/ProductEdit';
import CategoriesList from '../components/Views/Admin/AdminPages/categories/CategoriesList';
import CategoryAdd from '../components/Views/Admin/AdminPages/categories/CategoryAdd';
import CategoryEdit from '../components/Views/Admin/AdminPages/categories/CategoryEdit';
import LayoutClient from '../components/Layouts/LayoutClient';
import HomePage from '../components/Views/Client/Pages/HomePage';
import NewsList from '../components/Views/Admin/AdminPages/news/NewsList';
import NewsAdd from '../components/Views/Admin/AdminPages/news/NewsAdd';
import NewsEdit from '../components/Views/Admin/AdminPages/news/NewsEdit';
import ProductsClient from '../components/Views/Client/Pages/ProductsClient';
import ProductFromCateID from '../components/Views/Admin/AdminPages/products/ProductFromCateID';
import UserList from '../components/Views/Admin/AdminPages/useradmin/UserList';
import UserEdit from '../components/Views/Admin/AdminPages/useradmin/UserEdit';
import Contact from '../components/Views/Client/Pages/Contact';
import AboutPage from '../components/Views/Client/Pages/AboutPage';
import ContactsList from '../components/Views/Admin/AdminPages/contact/ContactsList';
import SignUp from '../components/Views/Client/Pages/Auth/SignUp';
import SignIn from '../components/Views/Client/Pages/Auth/SignIn';
import ProductDetail from '../components/Views/Client/Pages/ProductDetail';
import NotFound from '../components/controller/NotFound';


const Router = () => {
  return (
    <Routes>
      {/* Client */}
      <Route path='/' element={<LayoutClient />}>
        <Route index element={<HomePage />} />
        <Route path='products-client' element={<ProductsClient />} />
        <Route path='product-client/:id' element={<ProductDetail />} />
        <Route path='contact' element={<Contact />} />
        <Route path='about-us' element={<AboutPage />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
      </Route>

      {/* Admin */}
      <Route
        path='admin'
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <LayoutAdmin />
          </ProtectedRoute>
        }
      >
        {/* Products */}
        <Route index element={<ProductsList />} />
        <Route path='products' element={<ProductsList />} />
        <Route path='products/add' element={<ProductAdd />} />
        <Route path='products/:id/edit' element={<ProductEdit />} />

        {/* Categories */}
        <Route path='categories' element={<CategoriesList />} />
        <Route path='categories/add' element={<CategoryAdd />} />
        <Route path='categories/:id/edit' element={<CategoryEdit />} />
        <Route path='categories/:id/products' element={<ProductFromCateID />} />

        {/* News */}
        <Route path='news' element={<NewsList />} />
        <Route path='news/add' element={<NewsAdd />} />
        <Route path='news/:id/edit' element={<NewsEdit />} />

        {/* Users */}
        <Route path='users' element={<UserList />} />
        <Route path='users/:id/edit' element={<UserEdit />} />

        {/* Contact */}
        <Route path='contacts' element={<ContactsList />} />
      </Route>

      {/* 404 */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Router;