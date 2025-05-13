import React from 'react'
import { Route, Routes } from 'react-router';
import Layout from './layout/Layout';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/Home';
import Basket from './pages/Basket';
import CategoryPage from './pages/category';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />}/>
        <Route path='/category/' element={<CategoryPage />}/>
        <Route path='/productDetail/:id' element={<ProductDetails />}/>
        <Route path='/basket' element={<Basket />}/>
      </Route>
    </Routes>
    <ToastContainer/>
    </>
  )
};

export default App;