import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getUser } from "../Store/ActionCreatore/UserActionCreatore"
import { deleteWishlist, getWishlist } from '../Store/ActionCreatore/WishlistActionCreatore'
import { getCheckout } from '../Store/ActionCreatore/CheckoutActionCreatore'
import BuyerProfile from './BuyerProfile'

export default function Profile() {
  var users = useSelector((state) => state.UserStateData)
  var [user, setuser] = useState({})

  var wishlists = useSelector((state) => state.WishlistStateData)
  var [wishlist, setwishlist] = useState([])

  var checkouts = useSelector((state) => state.CheckoutStateData)
  var [orders, setorder] = useState([])

  var dispatch = useDispatch()
  function deleteItem(id) {
    dispatch(deleteWishlist({ id: id }))
    getAPIData()
  }

  function getAPIData() {
    dispatch(getUser())
    dispatch(getWishlist())
    dispatch(getCheckout())
    var data = users.find((item) => item.id === Number(sessionStorage.getItem("userid")))
    if (data)
      setuser(data)

    data = wishlists.filter((item) => item.userid === sessionStorage.getItem("userid"))
    if (data)
      setwishlist(data)

    data = checkouts.filter((item) => item.userid === sessionStorage.getItem("userid"))
    if (data)
      setorder(data)
  }



  useEffect(() => {
    getAPIData()
  }, [users.length, wishlists.length, checkouts.length])
  return (
    <>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-6">
            {
              user.pic ?
                <img src={`/assets/images/${user.pic}`} height="550px" width="100%" alt="No user Image" /> :
                <img src="/assets/images/person_2.jpg" height="550px" width="100%" alt="no image" />
            }
          </div>
          <div className="col-md-6">
            <BuyerProfile user={user} />
          </div>
        </div>
        <h5 className='text-center mt-2'>Wishlist Section</h5>
        <div className="table-responsive">
          <table className="mytable">
            <thead className="thead-primary">
              <tr className="text-center">
                <th>&nbsp;</th>
                <th>Product</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {
                wishlist && wishlist.map((item, index) => {
                  return <tr key={index} className="text-center">
                    <td className="image-prod"><img src={`assets/productimages/${item.pic}`} /></td>
                    <td>{item.name}</td>
                    <td className="product-name">{item.color}</td>
                    <td className="product-name">{item.size}</td>
                    <td className="product-name">{item.price}</td>

                    <td><Link to={`/singleproductpage/${item.productid}`} onClick={() => deleteItem(item.id)} className='' style={{ background: "none", width: "30px" }}> <i className="icon ion-ios-cart"></i></Link></td>


                    <td><button onClick={() => deleteItem(item.id)} className='' style={{ background: "none", width: "30px" }}> <i className="icon ion-ios-trash"></i></button></td>

                  </tr>
                })
              }
            </tbody>
          </table>
        </div>


        <h5 className='text-center my-2'>Order History Section</h5>
        {
          orders.map((item, index) => {
            return <div className="row" key={index}>
              <div className="col-lg-3">
                <table className='mytable'>
                  <tbody>
                    <tr>
                      <th>Order ID</th>
                      <td>{item.id}</td>
                    </tr>
                    <tr>
                      <th>Payment Mode</th>
                      <td>{item.paymentmode}</td>
                    </tr>
                    <tr>
                    <th>Order Status</th>
                      <td>{item.orderstatus}</td>
                    </tr>
                    <tr>
                      <th>Payment Status</th>
                      <td>{item.paymentstatus}</td>
                    </tr>
                    <tr>
                      <th>Total Amount</th>
                      <td>&#8377;{item.totalAmount}</td>
                    </tr>
                    <tr>
                      <th>Shipping Amount</th>
                      <td>&#8377;{item.shippingAmount}</td>
                    </tr>
                    <tr>
                      <th>Final Amount</th>
                      <td>&#8377;{item.finalAmount}</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>{item.time}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-9">
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
                            <td className="image-prod"><img src={`assets/productimages/${item.pic}`} /></td>
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
