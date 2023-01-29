import React, {useState, useEffect} from 'react'

// import { Link } from 'react-router-dom'
import LeftNav from './LeftNav'

import {addBrand, getBrand} from "../../Store/ActionCreatore/BrandActionCreatore"

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function AdminAddBrand() {
    var [name, setname] = useState("")
    var brand = useSelector((state)=>state.BrandStateData )
    var Navigate = useNavigate()
    var dispatch = useDispatch()
    function getData (e) {
        setname(e.target.value)
    }
    function postData(e){
        e.preventDefault()
        var item = brand.find((item)=>item.name===name)
        if(item)
        alert("Brand Name is Already Exist")
        else{
            dispatch(addBrand({name:name}))
            Navigate("/admin-brand")
        }
    }
    useEffect(()=>{
        dispatch(getBrand())
    },[])
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <LeftNav />
                    </div>
                    <div className="col-lg-10">
                        <h5 className='bg-secondary text-center text-light p-1'>Brand</h5>
                        <form onSubmit={postData} className='p-3'>
                            <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" name='name' id="name" onChange={getData} className='form-control' placeholder='Enter Brand name' required/>
                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-secondary w-100 '>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
