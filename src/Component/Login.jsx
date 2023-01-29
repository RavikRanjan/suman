import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import { getUser } from "../Store/ActionCreatore/UserActionCreatore"

export default function Login() {
    var [data, setData] = useState({
        username: "",
        password: ""
    })
    var users = useSelector((state) => state.UserStateData)
    var dispatch = useDispatch()
    var navigate = useNavigate()
    function getData (e){
        var name = e.target.name
        var value = e.target.value
        setData((old) => {
            return {
                ...old,
                [name] : value
            }
        })
    }
    function postData(e) {
        e.preventDefault ()
        var user = users.find((item)=>item.username===data.username && item.password===data.password)
        if(user){
            sessionStorage.setItem("login",true)
            sessionStorage.setItem("name",user.name)
            sessionStorage.setItem("username",user.username)
            sessionStorage.setItem("userid",user.id)
            sessionStorage.setItem("role",user.role)
            if(user.role === "Admin")
            navigate("/admin-home")
            else
            navigate("/profile")
        }
        else
        alert("Invalid Username or Password")
    }
    useEffect(()=>{
        dispatch(getUser())
    }, [])
    return (
        <>
            <div className='bg_Image'>
                <div className="container mt-5 mb-3 w-500px" >
                    <div className="login">
                        <h1><i className="bi bi-person-circle login_icon"></i></h1>
                        <h2>Login Form</h2>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label htmlFor="username">username</label>
                                <input type="text" className='form-control' id="username" name='username' onChange={getData} placeholder='Enter your username' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' className='form-control'  id='password' onChange={getData} maxLength={15} minLength={8} placeholder='Enter your Password' />
                            </div>
                            <div className="mb-3">
                                <button type='submit'>Login</button>
                            </div>
                            <div className="mb-3 d-flex justify-content-between">
                                <Link className='text-dark' to="#"> Forget Password</Link>
                                <Link className='text-dark' to="/signup">New User? Create a free Account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
