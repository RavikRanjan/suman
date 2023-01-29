import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getUser, updateUser } from "../Store/ActionCreatore/UserActionCreatore"

export default function Updateprofile() {
    var [data, setdata] = useState({
        name: "",
        pic: "",
        email: "",
        phone: "",
        addressline1: "",
        addressline2: "",
        addressline3: "",
        pin: "",
        city: "",
        state: ""
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
    function getFile(e) {
        var name = e.target.name
        var value = e.target.files[0].name
        setdata((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        var item = {
            id:sessionStorage.getItem("userid"),
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            addressline1: data.addressline1,
            addressline2: data.addressline2,
            addressline3: data.addressline3,
            pin: data.pin,
            city: data.city,
            state: data.state,
            pic: data.pic,
            role: data.role,
        }
        dispatch(updateUser(item))
        if(data.role==="Admin")
        navigate("/admin-home")
        else
        navigate("/profile")
    }
    useEffect(() => {
        dispatch(getUser())
        var d = users.find((item) => item.id === Number(sessionStorage.getItem("userid")))
        if(d)
        setdata(d)
    }, [])
    return (
        <>
            <div className="Main_Sign">
                <div className="Container mt-5 mb-3 w-500px">
                    <div className="Second_Sign mt-4">
                        <form onSubmit={postData}>
                            <h3 className='text-center bg-secondary p-2 text-light rounded'>Profile Update Section</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" name="name" id='name' onChange={getData} className='form-control' placeholder='Enter your First Name' value={data.name} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="pic">Picture</label>
                                    <input type="file" name="pic" id='pic' onChange={getFile} className='form-control'/>
                                </div>
                            </div>
                            <div className="row mt-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" name="email" id='email' onChange={getData} className='form-control' placeholder='Enter your email Address' value={data.email}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="tel" maxLength={10} minLength={10} name="phone" id='phone' onChange={getData} className='form-control' placeholder='Enter your Mobile Number' value={data.phone}/>
                                </div>
                            </div>
                            <div className="row mt-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="addressline1">House, Floor or Building Number</label>
                                    <input type="text" name="addressline1" id='addressline1' className='form-control' onChange={getData} placeholder='Enter your House, Floor or Building Number' value={data.addressline1}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="addressline2">Street Number or Near</label>
                                    <input type="text" name="addressline2" id='addressline2' className='form-control' onChange={getData} placeholder='Enter your Street Number or Near By:' value={data.addressline2}/>
                                </div>
                            </div>
                            <div className="row mt-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="addressline3">Village or Locality</label>
                                    <input type="text" name="addressline3" id='addressline3' className='form-control' onChange={getData} placeholder='Enter your Village Name or locality' value={data.addressline3}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="pin">Pin</label>
                                    <input type="text" name="pin" id='pin' className='form-control' onChange={getData} placeholder='Enter Pin Number' value={data.pin}/>
                                </div>
                            </div>
                            <div className="row mt-3 mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" id='city' className='form-control' onChange={getData} placeholder='Enter City Name' value={data.city}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="state">State</label>
                                    <input type="text" name="state" id='state' className='form-control' onChange={getData} placeholder='Enter State Name' value={data.state}/>
                                </div>
                            </div>
                            <div className='btn_sign'>
                                <button type='submit'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>


    )
}
