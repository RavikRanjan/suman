import React, {useState, useEffect} from 'react'

// import { Link } from 'react-router-dom'
import LeftNav from './LeftNav'

import {addSubcategory, getSubcategory} from "../../Store/ActionCreatore/SubcategoryActionCreatore"

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function AdminAddSubcategory() {
    var [name, setname] = useState("")
    var subcategory = useSelector((state)=>state.SubcategoryStateData )
    var Navigate = useNavigate()
    var dispatch = useDispatch()
    function getData (e) {
        setname(e.target.value)
    }
    function postData(e){
        e.preventDefault()
        var item = subcategory.find((item)=>item.name===name)
        if(item)
        alert("Subcategory Name is Already Exist")
        else{
            dispatch(addSubcategory({name:name}))
            Navigate("/admin-subcategory")
        }
    }
    useEffect(()=>{
        dispatch(getSubcategory())
    },[])
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <LeftNav />
                    </div>
                    <div className="col-lg-10">
                        <h5 className='bg-secondary text-center text-light p-1'>Subcategory</h5>
                        <form onSubmit={postData} className='p-3'>
                            <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" name='name' id="name" onChange={getData} className='form-control' placeholder='Enter Subcategory name' required/>
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
