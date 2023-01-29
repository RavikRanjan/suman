import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addNewslatter, getNewslatter } from '../Store/ActionCreatore/NewslatterActionCreatore'
export default function Newslatter() {
    var [email, setemail] = useState("")
    var [show, setshow] = useState(false)
    var [msg, setmsg] = useState(false)
    var newslatter = useSelector((state) => state.NewslatterStateData)
    var dispatch = useDispatch()
    function getData(e) {
        setemail(e.target.value)
    }
    function postData(e) {
        e.preventDefault()
        var r = newslatter.find((item) => item.email === email)
        if (r) {
            setshow(true)
            setmsg("Your Email Id is Already Subscribe!!!")
        }
        else {
            dispatch(addNewslatter({ email: email }))
            setshow(true)
            setmsg("Thanks to Subscribe for our Newsletter Service!!!")
        }
    }
    useEffect(() => {
        dispatch(getNewslatter())
    }, [newslatter.length])

    return (
        <>
            <section className="ftco-gallery">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 heading-section text-center mb-4">
                            <h2 className="mb-4">Subscribe Our Newsletter Service</h2>
                            {
                                show ? <div class="alert alert-success text-center alert-dismissible fade show" role="alert">
                                    {msg}
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div> : ""
                            }
                            <form onSubmit={postData}>
                                <div className='mb-3'>
                                    <input type="email" name="email" id="email" onChange={getData} className='form-control' placeholder='Enter your Email Address' />
                                </div>
                                <div className='mb-3'>
                                    {/* <input type="submit" value="submit" className='btn btn-success w-100 rounded-0' /> */}
                                    <button type="submit" className='btn btn-success w-100 rounded-0'>Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
