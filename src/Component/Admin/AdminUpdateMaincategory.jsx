import React, { useState, useEffect } from 'react'

// import { Link } from 'react-router-dom'
import LeftNav from './LeftNav'

import {updateMaincategory, getMaincategory} from "../../Store/ActionCreatore/MaincategoryActionCreatore"

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function AdminUpdateMaincategory() {
    var [name, setname] = useState("")
    var {id} = useParams()
    var maincategory = useSelector((state)=>state.MaincategoryStateData )
    var Navigate = useNavigate()
    var dispatch = useDispatch()
    function getData (e) {
        setname(e.target.value)
    }
    function postData(e){
        e.preventDefault()
        var item = maincategory.find((item)=>item.name===name)
        if(item)
        alert("Maincategory Name is Already Exist")
        else{
            dispatch(updateMaincategory({id:id, name:name}))
            Navigate("/admin-maincategory")
        }
    }
    useEffect(()=>{
        dispatch(getMaincategory())
        var item = maincategory.find((item) => item.id===Number(id))
        setname(item.name)
    },[])
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <LeftNav />
                    </div>
                    <div className="col-lg-10">
                        <h5 className='bg-secondary text-center text-light p-1'>Maincategory</h5>
                        <form onSubmit={postData} className='p-3'>
                            <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" name='name' id="name" onChange={getData} className='form-control' placeholder='Enter your name' value={name} required/>
                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-secondary w-100 '>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
