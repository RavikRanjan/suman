import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from "../Store/ActionCreatore/ProductActionCreatore"
import { getCart, addCart } from "../Store/ActionCreatore/CartActionCreatore"
import { getWishlist, addWishlist } from "../Store/ActionCreatore/WishlistActionCreatore"


export default function SingleProductPage() {
    var [p, setp] = useState({
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: "",
        pic5: "",
    })
    var [qty, setqty] = useState(1)
    var product = useSelector((state) => state.ProductStateData)
    var cart = useSelector((state) => state.CartStateData)
    var wishlist = useSelector((state) => state.WishlistStateData)
    var navigate = useNavigate()

    var { id } = useParams()
    var dispatch = useDispatch()
    function getAPIData() {
        dispatch(getProduct())
        dispatch(getCart())
        dispatch(getWishlist())
        var data = product.find((item) => item.id === Number(id))
        if (data)
            setp(data)
    }
    function addToCart() {
        var d = cart.find((item) => item.productid === Number(id) && item.userid === sessionStorage.getItem("userid"))
        if (d)
            navigate("/cart")
        else {
            var item = {
                productid: p.id,
                userid: sessionStorage.getItem("userid"),
                name: p.name,
                color: p.color,
                size: p.size,
                price: p.finalprice,
                qty: qty,
                total: p.finalprice * qty,
                pic: p.pic1,
            }
            dispatch(addCart(item))
            navigate("/cart")
        }
    }



    function addToWishlist() {
        var d = wishlist.find((item) => item.productid === Number(id) && item.userid === sessionStorage.getItem("userid"))
        if (d)
            navigate("/profile")
        else {
            var item = {
                productid: p.id,
                userid: sessionStorage.getItem("userid"),
                name: p.name,
                color: p.color,
                size: p.size,
                price: p.finalprice,
                pic: p.pic1,
            }
            dispatch(addWishlist(item))
            navigate("/profile")
        }
    }
    useEffect(() => {
        getAPIData()
    }, [product.length])
    return (
        <>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-evenly">
                        <div className="col-lg-5 mb-2 border " style={{height:"420px"}}>
                            <div id="carouselExampleIndicators" className="carousel slide mt-1" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active 2000" data-interval="3000">
                                        <img className="d-block w-100" src={`/assets/productimages/${p.pic1}`} height="400px" alt="First slide" />
                                    </div>
                                    <div className="carousel-item" data-interval="3000">
                                        <img className="d-block w-100" src={`/assets/productimages/${p.pic2}`} height="400px" alt="Second slide" />
                                    </div>
                                    <div className="carousel-item" data-interval="3000">
                                        <img className="d-block w-100" src={`/assets/productimages/${p.pic3}`} height="400px" alt="Third slide" />
                                    </div>
                                    <div className="carousel-item" data-interval="3000">
                                        <img className="d-block w-100" src={`/assets/productimages/${p.pic4}`} height="400px" alt="Fourth slide" />
                                    </div>
                                    <div className="carousel-item" data-interval="3000">
                                        <img className="d-block w-100" src={`/assets/productimages/${p.pic5}`} height="400px" alt="Five slide" />
                                    </div>
                                    <ul className='carousel-indicators'>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                                    </ul>
                                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-7 mb-5 border">
                            <h4 className='text-center'>{p.name}</h4>
                            <div className='d-flex'>
                                <div className='border p-3 mt-2 w-50'>Category</div>
                                <div className='border p-3 mt-2 w-50'>{p.maincategory}/{p.subcategory}</div>
                            </div>
                            <div className='d-flex'>
                                <div className='border p-3 mt-2 w-50'>Brand</div>
                                <div className='border p-3 mt-2 w-50'>{p.brand}</div>
                            </div>
                            <div className='d-flex'>
                                <div className='border p-3 mt-2 w-50'>Price</div>
                                <div className='border p-3 mt-2 w-50'><del className='text-danger'>&#8377; {p.baseprice}</del> <sup>&#8377; {p.finalprice}</sup> &nbsp;&nbsp;&nbsp; <span className='text-dark'> {p.discount}%</span></div>
                            </div>
                            <div className='d-flex'>
                                <div className='border p-3 mt-2 w-50'>Color</div>
                                <div className='border p-3 mt-2 w-50'>{p.color}</div>
                            </div>
                            <div className='d-flex'>
                                <div className='border p-3 mt-2 w-50'>Size</div>
                                <div className='border p-3 mt-2 w-50'>{p.size}</div>
                            </div>
                            <div className='d-flex'>
                                <div className='border p-3 mt-2 w-50'>Stock</div>
                                <div className='border p-3 mt-2 w-50'>{p.stock}</div>
                            </div>
                            <div className='d-flex'>
                                <div className='border p-3 mt-2 w-50'>Description</div>
                                <div className='border p-3 mt-2 w-50'>{p.description}</div>
                            </div>
                            <div className="row mt-4">

                                {/* <div className="w-100"></div> */}
                                <div className="input-group text-center d-flex w-100 mx-5 mb-3">
                                    <span className="input-group-btn mr-2">
                                        <button type="button" id='btnminus' data-type="minus" data-field="" onClick={() => {
                                            if (qty > 1)
                                                setqty(qty - 1)
                                        }}>
                                            <i className="ion-ios-remove"></i>
                                        </button>
                                    </span>
                                    <span id='inqty'>{qty}</span>

                                    <span className="input-group-btn ml-2">
                                        <button type="button" id='btnplus' className="quantity-right-plus" data-type="plus" data-field="" onClick={() => {
                                            setqty(qty + 1)
                                        }}>
                                            <i className="ion-ios-add"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button onClick={addToCart} id="btncart">Add to Cart</button>
                                <button onClick={addToWishlist} id="btnwishlist">Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
