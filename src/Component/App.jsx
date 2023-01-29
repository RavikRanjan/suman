import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import Cart from './Cart'
import Contact from './Contact'
import SingleProductPage from './SingleProductPage'
import Footer from './Footer'
import Home from './Home'
import Navbar from './Navbar'
import Shop from './Shop'
import Login from './Login'
import Signup from './Signup'
import Checkout from './Checkout'

import AdminHome from './Admin/AdminHome'

import AdminAddMaincategory from './Admin/AdminAddMaincategory'
import AdminMaincategory from './Admin/AdminMaincategory'
import AdminUpdateMaincategory from './Admin/AdminUpdateMaincategory'

import AdminAddSubcategory from './Admin/AdminAddSubcategory'
import AdminSubcategory from './Admin/AdminSubcategory'
import AdminUpdateSubcategory from './Admin/AdminUpdateSubcategory'

import AdminUpdateBrand from './Admin/AdminUpdateBrand'
import AdminAddBrand from './Admin/AdminAddBrand'
import AdminBrand from './Admin/AdminBrand'

import AdminUpdateProduct from './Admin/AdminUpdateProduct'
import AdminAddProduct from './Admin/AdminAddProduct'
import AdminProduct from './Admin/AdminProduct'
import Profile from './Profile'
import Updateprofile from './UpdateProfile'
import Confirmation from './Confiration'
import AdminUsers from './Admin/AdminUsers'
import AdminContact from './Admin/AdminContact'
import AdminSingleContact from './Admin/AdminSingleContact'
import AdminCheckout from './Admin/AdminCheckout'
import AdminSingleCheckout from './Admin/AdminSingleCheckout'
import AdminNewslatter from './Admin/AdminNewslatter'




function App() {
    return (
        <>
            <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/cart' element={<Cart/>} />
                <Route path='/checkout' element = {<Checkout/>} />
                <Route path='/contact' element ={<Contact/>} />
                <Route path='/shop/:maincat/' element = {<Shop/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/SingleProductPage/:id' element={<SingleProductPage/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/update-profile' element={<Updateprofile/>} />
                <Route path='/confirmation' element={<Confirmation/>} />


                {/* Admin Page Here */}
                <Route path='/admin-home' element={<AdminHome/>} />
                <Route path='/admin-user' element={<AdminUsers/>} />
                <Route path='/admin-contact' element={<AdminContact/>} />
                <Route path='/admin-single-contact/:id' element={<AdminSingleContact/>} />
                <Route path='/admin-checkout' element={<AdminCheckout/>} />
                <Route path='/admin-single-checkout/:id' element={<AdminSingleCheckout/>} />
                <Route path='/admin-newslatter' element={<AdminNewslatter/>} />

                <Route path='/admin-add-maincategory' element={<AdminAddMaincategory/>}/>
                <Route path='/admin-maincategory' element={<AdminMaincategory/>} />
                <Route path='/admin-update-maincategory/:id' element={<AdminUpdateMaincategory/>} />

                <Route path='/admin-add-subcategory' element={<AdminAddSubcategory/>}/>
                <Route path='/admin-subcategory' element={<AdminSubcategory/>} />
                <Route path='/admin-update-subcategory/:id' element={<AdminUpdateSubcategory/>} />

                <Route path='/admin-add-brand' element = {<AdminAddBrand/>} />
                <Route path='/admin-brand' element = {<AdminBrand/>}/>
                <Route path='/admin-update-brand/:id' element = {<AdminUpdateBrand/>}/>

                <Route path='/admin-add-product' element = {<AdminAddProduct/>} />
                <Route path='/admin-product' element = {<AdminProduct/>} />
                <Route path='/admin-update-product/:id' element={<AdminUpdateProduct/>} />

            </Routes>
            <Footer/>
            </BrowserRouter>
            
        </>
    )
}

export default App
