import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addContact } from "../Store/ActionCreatore/ContactActionCreatore"

function Contact() {
    var dispatch = useDispatch()
    var [show, setshow] = useState(false)
    var [data, setdata] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
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
    function postData(e) {
        e.preventDefault()
        var item = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
            status: "Active",
            time: new Date()
        }
        dispatch(addContact(item))
        setshow(true)
    }

    return (
        <>
            <section className="ftco-section contact-section bg-light">
                <div className="container">
                    <div className="row d-flex mb-5 contact-info">
                        <div className="w-100"></div>
                        <div className="col-md-3 d-flex">
                            <div className="info bg-white p-4">
                                <p><span>Address:</span> SonarPatti Rod Chousa Madhpura </p>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex">
                            <div className="info bg-white p-4">
                                <p><span>Phone:</span> <Link to="tel://1234567920">+91 8002552360</Link></p>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex">
                            <div className="info bg-white p-4">
                                <p><span>Email:</span> <Link to="mailto:info@yoursite.com">minakshishoe@gmail.com</Link></p>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex">
                            <div className="info bg-white p-4">
                                <p><span>Website</span> <Link to="#">minakshishoecenter.com</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="row block-9">
                        <div className="col-md-6 order-md-last">
                            {
                                show?<div class="alert alert-success text-center alert-dismissible fade show" role="alert">
                                Thanks to Share Your Query With US!!! Our Team Will be Contact You Soon!!!
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>:""
                            }
                            <form onSubmit={postData} className="bg-white p-2 contact-form">
                                <div className="form-group">
                                    <input type="text" className="form-control" name='name' onChange={getData} placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <input type="tel" className="form-control" name='phone' onChange={getData} placeholder="Your Phone" />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name='email' onChange={getData} placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name='subject' onChange={getData} placeholder="Enter your subject" />
                                </div>
                                <div className="form-group">
                                    <textarea id="" cols="15" rows="6" className="form-control" name='message' onChange={getData} placeholder="Message"></textarea>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Send Message" className="btn btn-secondary rounded-0 w-100" />
                                </div>
                            </form>

                        </div>

                        <div className="col-md-6 d-flex">
                            <div className="mapouter"><div className="gmap_canvas"><iframe width="550" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=ducat%20noida%20sectore%2016&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-gallery ftco-section ftco-no-pb">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 heading-section text-center mb-4">
                            <h2 className="mb-4">Follow Us On Instagram</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid px-0">
                    <div className="row no-gutters">
                        <div className="col-md-4 col-lg-2">
                            <Link to="assets/images/gallery-1.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: "url('assets/images/gallery-1.jpg')" }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram"></span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4 col-lg-2">
                            <Link to="assets/images/gallery-2.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: "url('assets/images/gallery-2.jpg')" }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram"></span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4 col-lg-2">
                            <Link to="assets/images/gallery-3.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: "url('assets/images/gallery-3.jpg')" }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram"></span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4 col-lg-2">
                            <Link to="assets/images/gallery-4.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: "url('assets/images/gallery-4.jpg')" }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram"></span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4 col-lg-2">
                            <Link to="assets/images/gallery-5.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: "url('assets/images/gallery-5.jpg')" }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram"></span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-4 col-lg-2">
                            <Link to="assets/images/gallery-6.jpg" className="gallery image-popup img d-flex align-items-center" style={{ backgroundImage: "url('assets/images/gallery-6.jpg')" }}>
                                <div className="icon mb-4 d-flex align-items-center justify-content-center">
                                    <span className="icon-instagram"></span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
