import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getUser } from "../Store/ActionCreatore/UserActionCreatore"
import { getCart, deleteCart } from "../Store/ActionCreatore/CartActionCreatore"
import { addCheckout } from "../Store/ActionCreatore/CheckoutActionCreatore"
import BuyerProfile from './BuyerProfile'

function Checkout() {
    var [mode, setMode] = useState("COD")
    var users = useSelector((state) => state.UserStateData)
    var [user, setuser] = useState({})
    var dispatch = useDispatch()
    var [cart, setcart] = useState([])
    var [total, settotal] = useState([0])
    var [shipping, setshiping] = useState([0])
    var [final, setfinal] = useState([0])
    var carts = useSelector((state) => state.CartStateData)
    var navigate = useNavigate()

    function placeOrder(){
        var item = {
            userid:sessionStorage.getItem("userid"),
            paymentmode:mode,
            orderstatus:"Order Placed",
            paymentstatus:"Pending",
            time : new Date(),
            totalAmount:total,
            shippingAmount:shipping,
            finalAmount:final,
            products:cart
        }
        dispatch(addCheckout(item))
        for(let item of cart){
            dispatch(deleteCart({id:item.id}))
        }
        alert("Thank You!!!\nYour Order Has Been Placed!!!\nNow You Can Track Your Order in Profile Page")
        navigate("/shop/All")
    }

    function getData(e){
        setMode(e.target.value)
    }

    function getAPIData() {
        dispatch(getUser())
        var data = users.find((item) => item.id === Number(sessionStorage.getItem("userid")))
        if (data)
            setuser(data)

        dispatch(getCart())
        data = carts.filter((item) => item.userid === sessionStorage.getItem("userid"))
        if (data) {
            setcart(data)
            var total = 0
            var shipping = 0
            var final = 0
            for (let item of data) {
                total = total + item.total
            }
            if (total > 0 && total <= 1000)
                shipping = 150
            final = total + shipping
            settotal(total)
            setshiping(shipping)
            setfinal(final)
        }
    }

    useEffect(() => {
        getAPIData()
    }, [users.length, carts.length])

    return (
        <>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 mb-3">
                            <BuyerProfile user={user} />
                        </div>
                        <div className="col-md-6">
                            <div className="table-responsive mb-3">
                                <table className="mytable">
                                    <thead className="thead-primary">
                                        <tr className="text-center">
                                            <th>&nbsp;</th>
                                            <th>Product</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((item, index) => {
                                                return <tr key={index} className="text-center">
                                                    <td className="image-prod"><img src={`assets/productimages/${item.pic}`} /></td>
                                                    <td>{item.name}</td>
                                                    <td className="product-name">{item.color}</td>
                                                    <td className="product-name">{item.size}</td>

                                                    <td>&#8377;{item.price}</td>

                                                    <td>{item.qty}</td>

                                                    <td className="total">&#8377;{item.total}</td>

                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="cart-detail cart-total bg-light">
                                <h3 className="billing-heading mb-4">Cart Total</h3>
                                <p className="d-flex">
                                    <span>Subtotal</span>
                                    <span>&#8377;{total}</span>
                                </p>
                                <p className="d-flex">
                                    <span>Shipping</span>
                                    <span>&#8377;{shipping}</span>
                                </p>
                                <hr />
                                <p className="d-flex total-price">
                                    <span>Final</span>
                                    <span>&#8377;{final}</span>
                                </p>
                            </div>
                            <div className="cart-detail bg-light p-3 mt-3">
                                <h3 className="billing-heading">Payment Method</h3>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className="radio">
                                            <label><input type="radio" onChange={getData} name="mode" className="mr-2" value="Net Banking"/> Net Banking/Cart/UPI</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className="radio">
                                            <label><input type="radio" onChange={getData} name="mode" className="mr-2" value="COD" checked/>Cash On Delivery</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <p><button className="btn mt-3 p-2 btn-secondary w-100" onClick={placeOrder}>Place an order</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout
