import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import LeftNav from './LeftNav'
import { getCheckout, updateCheckout } from "../../Store/ActionCreatore/CheckoutActionCreatore"
import { getUser } from "../../Store/ActionCreatore/UserActionCreatore"
// import { getCheckout } from '../Store/ActionCreatore/CheckoutActionCreatore'
import { useParams } from 'react-router-dom'

export default function AdminSingleCheckout() {
    var [data, setdata] = useState({})
    var [user, setuser] = useState({})
    var [orders, setorder] = useState([])
    var [orderstatus, setorderstatus] = useState("")
    var [paymentstatus, setpaymentstatus] = useState("")
    var Checkouts = useSelector((state) => state.CheckoutStateData)
    var Users = useSelector((state) => state.UserStateData)
    var { id } = useParams()
    var dispatch = useDispatch()


    function getAPIData() {
        dispatch(getCheckout())
        dispatch(getUser())
        var d = Checkouts.find((item) => item.id === Number(id))
        if (d) {
            setdata(d)
            setorderstatus(d.paymentmode)
            setpaymentstatus(d.paymentstatus)
        }
        d = Users.find((item) => item.id === Number(sessionStorage.getItem("userid")))
        if (d) {
            setuser(d)
        }
        data = Checkouts.filter((item) => item.userid === sessionStorage.getItem("userid"))
        if (data)
            setorder(data)
    }

    function update() {
        dispatch(updateCheckout({ ...data, paymentstatus: paymentstatus, orderstatus: orderstatus }))
        setdata((old) => {
            return {
                ...old,
                ['orderstatus']: orderstatus,
                ['paymentstatus']: paymentstatus
            }
        })
    }

    function getData(e) {
        if (e.target.name === "orderstatus")
            setorderstatus(e.target.value)
        else
            setpaymentstatus(e.target.value)

    }

    useEffect(() => {
        getAPIData()
    }, [Checkouts.length, Users.length])
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <LeftNav />
                    </div>
                    <div className="col-lg-10">
                        <h5 className='bg-secondary text-center text-light p-1'>Single Checkout</h5>
                        <div className='d-flex'>
                            <div className="w-50 p-3 border">
                                ID
                            </div>
                            <div className="w-50 p-3 border">
                                {data.id}
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="w-50 p-3 border">
                                User Details
                            </div>
                            <div className="w-50 p-3 border">
                                <table cellPadding="10px">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th>User Name</th>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td>{user.phone}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td>
                                                <ul style={{ listStyleType: 'none' }}>
                                                    <li>{user.addressline1}</li>
                                                    <li>{user.addressline2}</li>
                                                    <li>{user.addressline3}</li>
                                                    <li>{user.city}</li>
                                                    <li>{user.pin}</li>
                                                    <li>{user.state}</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="w-50 p-3 border">
                                Payment Mode
                            </div>
                            <div className="w-50 p-3 border">
                                {data.paymentmode}
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="w-50 p-3 border">
                                Payment Status
                            </div>
                            <div className="w-50 p-3 border">
                                {data.paymentstatus}
                                {
                                    data.paymentstatus !== "Done" ?
                                        <select name="paymentstatus" onChange={getData} className='form-control'>
                                            <option value="Pending">Pending</option>
                                            <option value="Done">Done</option>
                                        </select> : ""
                                }
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="w-50 p-3 border">
                                Order Status
                            </div>
                            <div className="w-50 p-3 border">
                                {data.orderstatus}
                                {
                                    data.orderstatus !== "Delivered" ?
                                        <select name="orderstatus" onChange={getData} className='form-control'>
                                            <option value="Order Placed">Order Placed</option>
                                            <option value="Packed">Packed</option>
                                            <option value="Ready to ship">Ready to ship</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Out of Delivery">Out of Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                        </select> : ""
                                }
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="w-50 p-3 border">
                                Total Amount
                            </div>
                            <div className="w-50 p-3 border">
                                &#8377;{data.totalAmount}
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="w-50 p-3 border">
                                Shipping Amount
                            </div>
                            <div className="w-50 p-3 border">
                                &#8377;{data.shipping}
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="w-50 p-3 border">
                                Final Amount
                            </div>
                            <div className="w-50 p-3 border">
                                &#8377;{data.finalAmount}
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="w-50 p-3 border">
                                Date
                            </div>
                            <div className="w-50 p-3 border">
                                {data.time}
                            </div>
                        </div>
                        <div className='w-100 p-3 border'>
                            {
                                data.orderstatus !== "Delivered" || data.paymentstatus !== "Done" ?
                                    <button className='btn btn-success rounded-0 w-100' onClick={update}>Update</button> : ""
                            }
                        </div>
                    </div>
                </div>
                <h5 className='text-center my-2'>Order History Section</h5>
                {
                    orders && orders.map((item, index) => {
                        return <div className="row mb-3">
                            <div key={index} className="col-lg-12">
                                <div className="table-responsive">
                                    <table className="mytable">
                                        <thead className="thead-primary">
                                            <tr className="text-center">
                                                <th>&nbsp;</th>
                                                <th>Product</th>
                                                <th>Color</th>
                                                <th>Size</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                item.products.map((item, index) => {
                                                    return <tr key={index} className="text-center">
                                                        <td className="image-prod"><img src={`/assets/productimages/${item.pic}`} /></td>
                                                        <td>{item.name}</td>
                                                        <td className="product-name">{item.color}</td>
                                                        <td className="product-name">{item.size}</td>
                                                        <td className="product-name">&#8377;{item.price}</td>
                                                        <td className="product-name">{item.qty}</td>
                                                        <td className="product-name">&#8377;{item.total}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}
