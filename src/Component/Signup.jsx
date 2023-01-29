import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import { getUser, addUser } from "../Store/ActionCreatore/UserActionCreatore"

export default function Signup() {
    var [data, setdata] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    })
    var users = useSelector((state) => state.UserStateData)
    var dispatch = useDispatch()
    var navigate = useNavigate()
    function getData(e) {
        var name = e.target.name
        var value = e.target.value
        setdata((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        if (data.password === data.cpassword) {
            var d = users.find((item) => item.username===data.username)
            if(d)
            alert("UserName Already Taken!!!")
            else{
                var item = {
                    name:data.name,
                    username:data.username,
                    email:data.email,
                    phone:data.phone,
                    password:data.password,
                    addressline1:"",
                    addressline2:"",
                    addressline3:"",
                    pin:"",
                    city:"",
                    state:"",
                    pic:"",
                    role:"User",
                }
                dispatch(addUser(item))
                navigate("/login")
            }
        }
        else
            alert("Password and Conform Password Doesn't Matched!!!")
    }
    useEffect(()=>{
        dispatch(getUser())
    }, [])
    return (
        <>
            <div className="Main_Sign">
                <div className="Container mt-5 mb-3 w-500px">
                    <div className="Second_Sign mt-4">
                        <form action="" className='' onSubmit={postData}>
                            <h2>Registration Form</h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" name="name" id='name' onChange={getData} className='form-control' placeholder='Enter your First Name' required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="username">UserName</label>
                                    <input type="text" name="username" id='username' onChange={getData} className='form-control' placeholder='Enter your Last Name' required />
                                </div>
                            </div>
                            <div className="row mt-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" name="email" id='email' onChange={getData} className='form-control' placeholder='Enter your email Address' required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" maxLength={10} minLength={10} name="phone" id='phone' onChange={getData} className='form-control' placeholder='Enter your Mobile Number' required />
                                </div>
                            </div>
                            <div className="row mt-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id='password' className='form-control' minLength={8} maxLength={15} onChange={getData} placeholder='Enter your Password' required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="cpassword">Conform Password</label>
                                    <input type="password" name="cpassword" id='cpassword' className='form-control' minLength={8} maxLength={15} onChange={getData} placeholder='Enter your Conform Password' required />
                                </div>
                            </div>
                            <div className='mt-2 px-3'>
                                <input type="checkbox" required /> <label htmlFor="agree">I agree to create a new account.</label>
                            </div>
                            <div className='btn_sign'>
                                <button type='submit'>Sign Up</button>
                            </div>
                            <div className='btn_sign mt-3 text-center'>
                                <p><Link to="/Login"> I have already account Login Here </Link></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>


    )
}
