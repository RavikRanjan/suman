import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LeftNav from './LeftNav'

import { getUser } from "../../Store/ActionCreatore/UserActionCreatore"
import { Link } from 'react-router-dom'
export default function AdminHome() {
    var users = useSelector((state) => state.UserStateData)
    var [user, setuser] = useState({})
    var dispatch = useDispatch()

    function getAPIData() {
        dispatch(getUser())
        var d = users.find((item) => item.id === Number(sessionStorage.getItem("userid")))
        if (d)
            setuser(d)
    }

    useEffect(() => {
        getAPIData()
    }, [users.length])

    return (
        <>
            <div className="container-fluid mt-5 mb-3">
                <div className="row">
                    <div className="col-lg-2">
                        <LeftNav />
                    </div>
                    <div className="col-lg-10 Admin-heading">
                        <h5>WELCOME TO MINAKSHI SHOE CENTER ADMIN PANEL</h5>
                        <div className="row">
                            <div className="admin-image col-md-4">
                                {
                                    user.pic ?
                                    <img src={`/assets/images/${user.pic}`} className='img-fluid' height="420px" alt="" />:
                                        <img src="/assets/images/noimage.png" className='ing-fluid' height="420px" alt="" />
                                }
                            </div>
                            <div className="col-md-8">
                                <div className='d-flex'>
                                    <div className='border p-3 mt-2 w-50'>Name</div>
                                    <div className='border p-3 mt-2 w-50'>{user.name}</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='border p-3 mt-2 w-50'>Mobile</div>
                                    <div className='border p-3 mt-2 w-50'>{user.phone}</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='border p-3 mt-2 w-50'>Email</div>
                                    <div className='border p-3 mt-2 w-50'>{user.email}</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='border p-3 mt-2 w-50'>User</div>
                                    <div className='border p-3 mt-2 w-50'>Admin</div>
                                </div>
                                <div className='d-flex'>
                                    <div className='border p-3 mt-2 w-50'>Role</div>
                                    <div className='border p-3 mt-2 w-50'>{user.role}</div>
                                </div>
                                <div className='update-profile mb-3 mt-3'>
                                    <Link to="/update-profile" className="btn btn-secondary w-100">Update Profile</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
